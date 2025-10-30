import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";

const breathingTechniques = [
  {
    id: 1,
    name: "4-7-8 (Relajación)",
    inhale: 4,
    hold: 7,
    exhale: 8,
    description: "Perfecta para reducir ansiedad y dormir mejor"
  },
  {
    id: 2,
    name: "Box Breathing (Equilibrio)",
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfter: 4,
    description: "Técnica usada por Navy SEALs para mantener la calma"
  },
  {
    id: 3,
    name: "Pranayama (Energía)",
    inhale: 4,
    hold: 4,
    exhale: 4,
    description: "Respiración yóguica para equilibrar energía vital"
  }
];

export const BreathingExercise = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(breathingTechniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "holdAfter">("inhale");
  const [countdown, setCountdown] = useState(selectedTechnique.inhale);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        if (phase === "inhale") {
          setPhase("hold");
          return selectedTechnique.hold;
        } else if (phase === "hold") {
          setPhase("exhale");
          return selectedTechnique.exhale;
        } else if (phase === "exhale" && selectedTechnique.holdAfter) {
          setPhase("holdAfter");
          return selectedTechnique.holdAfter;
        } else {
          // Complete cycle
          setCycleCount((c) => c + 1);
          setPhase("inhale");
          return selectedTechnique.inhale;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, selectedTechnique]);

  const handleStart = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCountdown(selectedTechnique.inhale);
    setCycleCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Inhala";
      case "hold":
        return "Sostén";
      case "exhale":
        return "Exhala";
      case "holdAfter":
        return "Sostén";
      default:
        return "";
    }
  };

  const getCircleScale = () => {
    if (!isActive) return "scale-100";
    switch (phase) {
      case "inhale":
        return "scale-110";
      case "hold":
        return "scale-110";
      case "exhale":
        return "scale-90";
      case "holdAfter":
        return "scale-90";
      default:
        return "scale-100";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-semibold">Respiración Consciente</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Técnicas de respiración para calmar tu mente y reducir la ansiedad
        </p>
      </div>

      {/* Technique Selection */}
      <div className="grid md:grid-cols-3 gap-6">
        {breathingTechniques.map((technique) => (
          <Card
            key={technique.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedTechnique.id === technique.id
                ? 'ring-2 ring-calm shadow-glow scale-105'
                : 'card-hover'
            }`}
            onClick={() => {
              setSelectedTechnique(technique);
              setPhase("inhale");
              setCountdown(technique.inhale);
              setIsActive(false);
              setCycleCount(0);
            }}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-calm/20 flex items-center justify-center">
                <Wind className="w-6 h-6 text-calm" />
              </div>
              <h3 className="text-xl font-semibold">{technique.name}</h3>
              <p className="text-sm text-muted-foreground">{technique.description}</p>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>Inhala: {technique.inhale}s</span>
                <span>•</span>
                <span>Sostén: {technique.hold}s</span>
                <span>•</span>
                <span>Exhala: {technique.exhale}s</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Breathing Visualizer */}
      <Card className="p-8 bg-gradient-calm/20 border-calm/40 shadow-soft">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">{selectedTechnique.name}</h3>
            <p className="text-muted-foreground">Ciclos completados: {cycleCount}</p>
          </div>

          {/* Breathing Circle */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div
              className={`absolute w-full h-full rounded-full bg-gradient-spiritual transition-all duration-1000 ease-in-out ${getCircleScale()} ${
                isActive ? 'opacity-60' : 'opacity-40'
              }`}
            />
            <div className="relative z-10 text-center space-y-2">
              <p className="text-2xl font-semibold text-foreground">
                {getPhaseText()}
              </p>
              <p className="text-6xl font-bold text-foreground">
                {countdown}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handleStart}
              className="bg-gradient-calm hover:opacity-90 transition-opacity"
            >
              {isActive ? (
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

          {/* Instructions */}
          <div className="w-full max-w-2xl space-y-4 text-center">
            <p className="text-muted-foreground">
              {isActive
                ? "Sigue el ritmo del círculo... Respira naturalmente... Deja que tu cuerpo se relaje..."
                : "Encuentra una posición cómoda. Presiona comenzar cuando estés listo para empezar."}
            </p>
          </div>
        </div>
      </Card>

      {/* Benefits */}
      <Card className="p-6 bg-muted/50">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Beneficios de la respiración consciente:</h4>
          <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Reduce la ansiedad y el estrés
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Mejora la concentración
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Equilibra el sistema nervioso
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Promueve el sueño profundo
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Aumenta la claridad mental
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Fortalece la conexión mente-cuerpo
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};
