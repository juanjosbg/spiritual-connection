import { useState } from "react";
import { ExerciseSidebar } from "@/pages/Ejerice/ExerciseSidebar";
import { ExerciseContent } from "@/components/exercise/ExerciseContent";

export default function EjercisePage() {
  const [activeSection, setActiveSection] = useState("Ejercicios recomendados");
  const [filters, setFilters] = useState({
    muscle: "chest",
    type: "strength",
  });

  return (
    <div className="relative min-h-screen flex mt-12 bg-white dark:bg-[#0f172a] transition-colors duration-500">
      <ExerciseSidebar setActiveSection={setActiveSection} setFilters={setFilters} />

      <div className="flex-1 p-4 md:p-10 relative overflow-y-auto">
        {activeSection === "Ejercicios recomendados" && (
          <ExerciseContent filters={filters} />
        )}
      </div>
    </div>
  );
}
