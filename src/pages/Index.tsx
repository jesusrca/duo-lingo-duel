
import { LanguageSelector } from "@/components/LanguageSelector"
import { Leaderboard } from "@/components/Leaderboard"

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            ¡Aprende idiomas jugando!
          </h1>
          <p className="text-xl text-gray-600">
            Compite con otros jugadores mientras aprendes nuevas palabras
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
          <LanguageSelector />
          <Leaderboard />
        </div>
      </div>
    </div>
  )
}

export default Index
