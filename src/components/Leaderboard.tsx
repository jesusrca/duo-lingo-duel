
import { Card } from "@/components/ui/card"

type Player = {
  name: string
  score: number
  matches: number
}

// Datos de ejemplo para el ranking
const players: Player[] = [
  { name: "Ana", score: 150, matches: 10 },
  { name: "Carlos", score: 120, matches: 8 },
  { name: "María", score: 90, matches: 6 },
]

export function Leaderboard() {
  return (
    <Card className="w-full max-w-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Ranking</h2>
      
      <div className="space-y-4">
        {players.map((player, index) => (
          <div
            key={player.name}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${
                index === 0 ? "text-yellow-500" :
                index === 1 ? "text-gray-400" :
                index === 2 ? "text-amber-600" :
                "text-gray-700"
              }`}>
                #{index + 1}
              </span>
              <span className="font-medium">{player.name}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#9b87f5]">{player.score} pts</p>
              <p className="text-sm text-gray-500">{player.matches} partidas</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
