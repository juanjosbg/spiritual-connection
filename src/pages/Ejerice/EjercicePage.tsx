// src/pages/EjercicePage.tsx
import { useState } from "react";
import { ExerciseSidebar } from "@/components/exercise/ExerciseSidebar";
import ExerciseContentDB from "@/components/exercise/ExerciseContentDB";
import { useExerciseFilters } from "@/hooks/useExerciseFilters";

export default function EjercicePage() {
  const { filters, updateFilter } = useExerciseFilters();
  const [activeSection, setActiveSection] = useState("Ejercicios recomendados");

  return (
    <div className="relative min-h-screen flex mt-12 bg-white dark:bg-[#0f172a] transition-colors duration-500">
      <ExerciseSidebar
        setActiveSection={setActiveSection}
        setFilters={(newFilters) => {
          updateFilter("muscle", newFilters.muscle);
          updateFilter("type", newFilters.type);
        }}
      />

      <div className="flex-1 p-4 md:p-10 relative overflow-y-auto">
        {activeSection === "Ejercicios recomendados" && (
          <ExerciseContentDB
            muscle={filters.muscle}
            type={filters.type}
          />
        )}
      </div>
    </div>
  );
}
