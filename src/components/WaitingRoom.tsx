
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocation, useNavigate } from "react-router-dom"

export function WaitingRoom() {
  const location = useLocation()
  const navigate = useNavigate()
  const { nativeLanguage, learningLanguage } = location.state || {}

  return (
    <Card className="w-full max-w-md p-6 space-y-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Sala de espera</h2>
        <p className="text-gray-500">Esperando a otro jugador...</p>
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
        onClick={() => navigate("/")}
        className="w-full"
      >
        Cancelar
      </Button>
    </Card>
  )
}
