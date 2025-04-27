
import { LanguageSelector } from "@/components/LanguageSelector"
import { Leaderboard } from "@/components/Leaderboard"
import { Header } from "@/components/Header"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Supabase Session:', session);
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking Supabase session:', error);
      }
    };

    checkAuth();
    
    // Suscribirse a cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth State Changed:', session);
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              ¡Aprende idiomas jugando!
            </h1>
            <p className="text-xl text-gray-600">
              Compite con otros jugadores mientras aprendes nuevas palabras
            </p>
          </div>

          {!isAuthenticated ? (
            <div className="text-center">
              <p className="text-lg mb-4">Inicia sesión para comenzar a jugar</p>
              <button 
                onClick={() => navigate("/auth")}
                className="bg-[#9b87f5] text-white px-6 py-2 rounded-md hover:bg-[#8b5cf6]"
              >
                Iniciar sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
              <LanguageSelector />
              <Leaderboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index
