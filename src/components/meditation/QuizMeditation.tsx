import { useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { Flower2 } from "lucide-react";

interface QuizMeditationProps {
  userId?: string;
  onComplete: (level: string) => void;
}

export function QuizMeditation({ userId, onComplete }: QuizMeditationProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [requireLogin, setRequireLogin] = useState(false);

  const questions = [
    {
      q: "¿Has practicado meditación antes?",
      options: ["Nunca", "Algunas veces", "Frecuentemente"],
    },
    {
      q: "¿Cuánto tiempo puedes concentrarte sin distracciones?",
      options: ["Menos de 5 minutos", "5 a 10 minutos", "Más de 10 minutos"],
    },
    {
      q: "¿Qué tan cómodo te sientes meditando en silencio?",
      options: ["Me cuesta mucho", "Puedo hacerlo con guía", "Me siento tranquilo"],
    },
  ];

  const handleSelect = (index: number) => {
    const updatedAnswers = [...answers, index];
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const finishQuiz = async (responses: number[]) => {
    const avg = responses.reduce((a, b) => a + b, 0) / responses.length;

    let level = "beginner";
    if (avg >= 1 && avg < 2) level = "intermediate";
    if (avg >= 2) level = "advanced";

    if (!userId) {
      setRequireLogin(true);
      return;
    }

    await supabase.from("user_levels").upsert({
      user_id: userId,
      category: "meditation",
      level,
    });

    onComplete(level);
  };

  const current = questions[step];

  if (requireLogin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          🔒 Inicia sesión para guardar tu progreso
        </h2>
        <p className="text-gray-600 mb-6">
          Ya calculamos tu nivel, pero necesitas iniciar sesión para guardarlo en tu cuenta.
        </p>

        <div className="flex gap-4">
          <a
            href="/login"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition"
          >
            Registrarme
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-30 relative flex flex-col lg:flex-row items-center justify-center w-full px-6 md:px-16 py-20 bg-white rounded-3xl shadow-xl mx-auto max-w-7xl overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-[60vh] from-indigo-100 to-white px-6 text-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center mb-3">
            <Flower2 className="w-20 h-20 text-blue-200" aria-hidden="true" />
          </div>

          <h2 className="text-3xl font-light text-indigo-400 uppercase">
            Evalúa tu nivel de meditación
          </h2>
          <p className="text-lg text-gray-500 mb-10">{current.q}</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="w-full bg-indigo-500 text-white py-3 rounded-full hover:bg-indigo-600 transition"
            >
              {opt}
            </button>
          ))}
        </div>

        <p className="mt-8 text-gray-500">
          Pregunta {step + 1} de {questions.length}
        </p>
      </div>
    </section>
  );
}
