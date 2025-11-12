// src/components/exercise/ExerciseSidebar.tsx
import { useState } from "react";

interface SidebarProps {
  setActiveSection: (section: string) => void;
  setFilters: (filters: { muscle: string; type: string }) => void;
}

export function ExerciseSidebar({
  setActiveSection,
  setFilters,
}: SidebarProps) {
  const [selectedMuscle, setSelectedMuscle] = useState("chest");
  const [selectedType, setSelectedType] = useState("strength");

  const handleApply = () => {
    setFilters({ muscle: selectedMuscle, type: selectedType });
    setActiveSection("Ejercicios recomendados");
  };

  return (
    <aside className="w-72 bg-gray-100 dark:bg-[#1b1b1b] p-6 border-r border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-6 dark:text-gray-100">
        Explorar ejercicios
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          Músculo
        </span>
        <select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="chest">Pecho</option>
          <option value="back">Espalda</option>
          <option value="legs">Piernas</option>
          <option value="shoulders">Hombros</option>
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
        </select>
      </label>

      <button
        onClick={handleApply}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
      >
        Aplicar filtros
      </button>
    </aside>
  );
}
