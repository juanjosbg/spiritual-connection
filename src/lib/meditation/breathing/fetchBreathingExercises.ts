export interface BreathingExercise {
  name: string;
  pattern: string; 
  description: string;
  duration: number;
  steps: string[];
}

export async function fetchBreathingExercises(): Promise<BreathingExercise[]> {
  return [
    {
      name: "Box Breathing",
      pattern: "4-4-4-4",
      description:
        "Respira profundamente en 4 tiempos, retén el aire 4, exhala 4 y espera 4 antes de volver a inhalar.",
      duration: 60,
      steps: ["Inhala 4s", "Retén 4s", "Exhala 4s", "Espera 4s"],
    },
    {
      name: "4-7-8 Technique",
      pattern: "4-7-8",
      description:
        "Inhala en 4 segundos, mantén la respiración por 7 y exhala lentamente en 8 segundos.",
      duration: 60,
      steps: ["Inhala 4s", "Retén 7s", "Exhala 8s"],
    },
    {
      name: "Mindful Breathing",
      pattern: "Natural",
      description:
        "Concéntrate solo en el ritmo natural de tu respiración, sin modificarlo.",
      duration: 120,
      steps: ["Observa tu respiración", "Relaja hombros", "Suelta el control"],
    },
  ];
}
