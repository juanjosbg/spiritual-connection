import { useState } from "react";
import { Dumbbell, Flame, Activity, RefreshCcw } from "lucide-react";

interface SidebarProps {
  setActiveSection: (section: string) => void;
  setFilters: (filters: { muscle: string; type: string }) => void;
}

export function ExerciseSidebar({ setActiveSection, setFilters }: SidebarProps) {
  const [selectedMuscle, setSelectedMuscle] = useState("chest");
  const [selectedType, setSelectedType] = useState("strength");

  const handleApply = () => {
    setFilters({ muscle: selectedMuscle, type: selectedType });
    setActiveSection("Ejercicios recomendados");
  };

  return (
    <aside className="w-72 bg-gray-100 dark:bg-[#1b1b1b] p-6 border-r border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-green-500" />
        Explorar ejercicios
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 text-sm">Músculo</span>
        <select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="chest">Pecho</option>
          <option value="legs">Piernas</option>
          <option value="back">Espalda</option>
          <option value="abs">Abdomen</option>
          <option value="biceps">Bíceps</option>
          <option value="triceps">Tríceps</option>
        </select>
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 dark:text-gray-300 text-sm">Tipo</span>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="strength">Fuerza</option>
          <option value="cardio">Cardio</option>
          <option value="stretching">Estiramiento</option>
          <option value="powerlifting">Powerlifting</option>
        </select>
      </label>

      <button
        onClick={handleApply}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <RefreshCcw className="w-4 h-4" />
        Aplicar filtros
      </button>

      <div className="mt-8 space-y-2 text-gray-600 dark:text-gray-400 text-sm">
        <p className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" /> Mejora tu rendimiento
        </p>
        <p className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" /> Aprende nuevas técnicas
        </p>
      </div>
    </aside>
  );
}
