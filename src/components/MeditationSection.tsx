import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

const meditations = [
  {
    id: 1,
    title: "Calma Mental",
    duration: 5,
    description: "Una meditación corta para centrar tu mente y encontrar calma",
    color: "primary"
  },
  {
    id: 2,
    title: "Conexión Espiritual",
    duration: 10,
    description: "Profundiza en tu ser interior y conecta con tu esencia",
    color: "calm"
  },
  {
    id: 3,
    title: "Paz Profunda",
    duration: 15,
    description: "Meditación extendida para alcanzar estados profundos de serenidad",
    color: "accent"
  }
];

export const MeditationSection = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(meditations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(selectedMeditation.duration * 60);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeRemaining(selectedMeditation.duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-semibold">Meditaciones Guiadas</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Elige la duración que mejor se adapte a tu momento y necesidad
        </p>
      </div>

      {/* Meditation Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {meditations.map((meditation) => (
          <Card
            key={meditation.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedMeditation.id === meditation.id
                ? 'ring-2 ring-primary shadow-glow scale-105'
                : 'card-hover'
            }`}
            onClick={() => {
              setSelectedMeditation(meditation);
              setTimeRemaining(meditation.duration * 60);
              setIsPlaying(false);
            }}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-full bg-${meditation.color}/20 flex items-center justify-center`}>
                <Clock className={`w-6 h-6 text-${meditation.color}`} />
              </div>
              <h3 className="text-xl font-semibold">{meditation.title}</h3>
              <p className="text-muted-foreground">{meditation.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{meditation.duration} minutos</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Player */}
      <Card className="p-8 bg-gradient-spiritual/20 border-primary/40 shadow-soft">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">{selectedMeditation.title}</h3>
            <p className="text-muted-foreground">{selectedMeditation.description}</p>
          </div>

          {/* Visualization Circle */}
          <div className={`w-48 h-48 rounded-full bg-gradient-spiritual flex items-center justify-center ${
            isPlaying ? 'animate-breathe' : ''
          }`}>
            <div className="w-40 h-40 rounded-full bg-card flex items-center justify-center">
              <span className="text-4xl font-semibold">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handlePlay}
              className="bg-gradient-spiritual hover:opacity-90 transition-opacity"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Comenzar
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reiniciar
            </Button>
          </div>

          {/* Meditation Guide */}
          <div className="w-full max-w-2xl space-y-4 text-center">
            <p className="text-muted-foreground">
              {isPlaying 
                ? "Respira profundamente... Deja que tu cuerpo se relaje... Observa tus pensamientos sin juzgarlos..." 
                : "Encuentra un lugar cómodo y tranquilo. Presiona comenzar cuando estés listo."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
