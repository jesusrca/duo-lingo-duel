
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function UserProfile() {
  const supabase = createClientComponentClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!error && userData) {
          setUser(userData.user);
        }
      }
      
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sesión cerrada");
      navigate("/auth");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  if (loading) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>;
  }

  if (!user) {
    return (
      <Button 
        onClick={() => navigate("/auth")}
        variant="outline"
        size="sm"
        className="text-sm"
      >
        Iniciar sesión
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>
          {user.email ? user.email[0].toUpperCase() : "U"}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium">
          {user.user_metadata?.username || user.email}
        </p>
        <Button 
          onClick={handleSignOut}
          variant="link"
          size="sm"
          className="h-auto p-0 text-gray-500 text-xs"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
