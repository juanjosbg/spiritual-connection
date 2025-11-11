import { Flower2, Music, Wind, Notebook } from "lucide-react";

interface MeditationSelectorProps {
  onSelect: (option: string) => void;
}

export default function MeditationSelector({ onSelect }: MeditationSelectorProps) {
  const options = [
    {
      id: "yoga",
      title: "Yoga y posturas",
      description: "Explora tus rutinas de meditación y mejora tu equilibrio.",
      icon: <Flower2 className="w-10 h-10 text-indigo-500" />,
    },
    {
      id: "music",
      title: "Relajación sonora",
      description: "Sumérgete en música relajante para calmar tu mente.",
      icon: <Music className="w-10 h-10 text-green-500" />,
    },
    {
      id: "breathing",
      title: "Respiración consciente",
      description: "Aprende a controlar tu respiración para encontrar calma.",
      icon: <Wind className="w-10 h-10 text-blue-400" />,
    },
    {
      id: "journal",
      title: "Diario de gratitud",
      description: "Escribe tus pensamientos y reflexiona sobre tu día.",
      icon: <Notebook className="w-10 h-10 text-pink-500" />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10">
      <h2 className="text-3xl font-light text-indigo-600 mb-10">
        ¿Qué deseas hacer hoy? 🌿
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition transform hover:-translate-y-1 flex flex-col items-center text-center border border-gray-100"
          >
            <div className="mb-4">{opt.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{opt.title}</h3>
            <p className="text-gray-500 text-sm">{opt.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
