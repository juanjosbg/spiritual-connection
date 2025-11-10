import { NutritionSidebar } from "@/pages/Nutrition/NuritionSidebar";
import { NutritionContent } from "@/components/nutrition/NutritionContent";
import { useState } from "react";

export default function NutritionPage() {
  const [user] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("Comidas saludables");
  const [filters, setFilters] = useState({
    goal: "All",
    mealType: "All",
    calorieLevel: "All",
  });

  return (
    <div className="relative min-h-screen flex mt-12">
      <NutritionSidebar
        user={user}
        setActiveSection={setActiveSection}
        setFilters={setFilters}
      />

      <div className="flex-1 p-4 md:p-10 relative">
        {activeSection === "Comidas saludables" && (
          <NutritionContent filters={filters} />
        )}
      </div>
    </div>
  );
}
