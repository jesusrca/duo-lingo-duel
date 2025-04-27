
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { createClientComponentClient } from "@supabase/auth-helpers-react";

export function WaitingRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const supabase = createClientComponentClient();
  const { nativeLanguage, learningLanguage } = location.state || {};

  const [roomCode, setRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [playersInRoom, setPlayersInRoom] = useState(1);
  const [isWaiting, setIsWaiting] = useState(false);

  // Generar un código aleatorio para la sala
  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return code;
  };

  // Crear una nueva sala
  const createRoom = async () => {
    try {
      const code = generateRoomCode();
      setGeneratedCode(code);
      setIsHost(true);
      setIsWaiting(true);

      const { error } = await supabase.from("game_rooms").insert([
        { 
          code, 
          host_language: nativeLanguage,
          host_learning: learningLanguage,
          players_count: 1,
          is_active: true
        }
      ]);

      if (error) throw error;

      toast.success("Sala creada correctamente");

      // Suscribirse a cambios en la sala
      const roomChannel = supabase.channel(`room:${code}`);
      roomChannel.on("presence", { event: "sync" }, () => {
        const newCount = Object.keys(roomChannel.presenceState()).length;
        setPlayersInRoom(newCount);
        
        if (newCount >= 2 && isHost) {
          // Si hay 2 jugadores y soy el anfitrión, comenzar el juego
          startGame(code);
        }
      }).subscribe();
      
    } catch (error: any) {
      toast.error(error.message || "Error al crear la sala");
    }
  };

  // Unirse a una sala existente
  const joinRoom = async () => {
    if (!roomCode) {
      toast.error("Por favor ingresa un código de sala");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("game_rooms")
        .select("*")
        .eq("code", roomCode)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        toast.error("Sala no encontrada o inactiva");
        return;
      }

      if (data.players_count >= 2) {
        toast.error("La sala está llena");
        return;
      }

      // Actualizar el contador de jugadores
      await supabase
        .from("game_rooms")
        .update({ players_count: 2 })
        .eq("code", roomCode);

      setGeneratedCode(roomCode);
      setIsWaiting(true);
      setIsHost(false);

      // Suscribirse a la sala
      const roomChannel = supabase.channel(`room:${roomCode}`);
      roomChannel.on("presence", { event: "sync" }, () => {
        const newCount = Object.keys(roomChannel.presenceState()).length;
        setPlayersInRoom(newCount);
      }).subscribe();

      toast.success("Te has unido a la sala");
      
      // El anfitrión iniciará el juego cuando detecte 2 jugadores
    } catch (error: any) {
      toast.error(error.message || "Error al unirse a la sala");
    }
  };

  // Iniciar el juego
  const startGame = async (code: string) => {
    // Aquí se iniciaría el juego
    toast.success("¡Iniciando partida!");
    // Navegar a la página del juego (aún no implementada)
    // navigate("/game", { state: { roomCode: code } });
  };

  // Cancelar y volver al inicio
  const handleCancel = async () => {
    // Si es el anfitrión, desactivar la sala
    if (isHost && generatedCode) {
      await supabase
        .from("game_rooms")
        .update({ is_active: false })
        .eq("code", generatedCode);
    }
    navigate("/");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Debes iniciar sesión para jugar");
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate, supabase]);

  if (isWaiting) {
    return (
      <Card className="w-full max-w-md p-6 space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Sala de espera</h2>
          <p className="text-gray-500">Jugadores: {playersInRoom}/2</p>
          <p className="text-gray-500">Código de sala: <span className="font-bold">{generatedCode}</span></p>
        </div>

        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-[#9b87f5] border-t-transparent rounded-full animate-spin" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Idioma nativo: {nativeLanguage}</p>
          <p className="text-sm text-gray-500">Idioma a aprender: {learningLanguage}</p>
        </div>

        <Button 
          variant="outline" 
          onClick={handleCancel}
          className="w-full"
        >
          Cancelar
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-6 space-y-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Unirse a una partida</h2>
        <p className="text-gray-500">Crea una sala o únete a una existente</p>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={createRoom}
          className="w-full bg-[#9b87f5] hover:bg-[#8b5cf6]"
        >
          Crear nueva sala
        </Button>

        <div className="flex items-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-2 text-gray-400">o</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <div className="space-y-2">
          <Input 
            placeholder="Ingresa código de sala" 
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="text-center uppercase"
          />
          <Button 
            onClick={joinRoom}
            className="w-full"
            variant="outline"
          >
            Unirse a sala
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">Idioma nativo: {nativeLanguage}</p>
        <p className="text-sm text-gray-500">Idioma a aprender: {learningLanguage}</p>
      </div>

      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="w-full text-gray-500"
      >
        Cancelar
      </Button>
    </Card>
  );
}
