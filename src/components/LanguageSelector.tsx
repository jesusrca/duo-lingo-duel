
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
]

export function LanguageSelector() {
  const [nativeLanguage, setNativeLanguage] = useState("")
  const [learningLanguage, setLearningLanguage] = useState("")
  const navigate = useNavigate()

  const handleStart = () => {
    if (nativeLanguage && learningLanguage) {
      navigate("/waiting-room", { 
        state: { nativeLanguage, learningLanguage }
      })
    }
  }

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Selecciona tus idiomas</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Idioma nativo</label>
          <Select onValueChange={setNativeLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu idioma nativo" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Idioma que quieres aprender</label>
          <Select onValueChange={setLearningLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el idioma a aprender" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem 
                  key={lang.code} 
                  value={lang.code}
                  disabled={lang.code === nativeLanguage}
                >
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        className="w-full bg-[#9b87f5] hover:bg-[#8b5cf6]"
        onClick={handleStart}
        disabled={!nativeLanguage || !learningLanguage}
      >
        Comenzar
      </Button>
    </Card>
  )
}
