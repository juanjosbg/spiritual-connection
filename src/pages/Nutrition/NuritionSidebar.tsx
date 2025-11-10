"use client";
import { useState } from "react";
import { Filter, Settings, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import ProfileSettingsDrawer from "@/components/Profile/ProfileSettingsDrawer";

const nutritionCategories = [
  "Comidas saludables",
  "Videos alimenticios",
  "Plan alimenticio",
];

export function NutritionSidebar({
  user,
  setActiveSection,
  setFilters,
  className = "",
}: any) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [goal, setGoal] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [calorieLevel, setCalorieLevel] = useState("All");

  const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

  const handleFilterChange = (newFilters: any) => {
    setFilters({
      goal,
      mealType,
      calorieLevel,
      ...newFilters,
    });
  };

  return (
    <aside
      className={classNames(
        "hidden md:flex w-[38vh] flex-col border-r bg-[#88b863] backdrop-blur-sm",
        className
      )}
    >
      {/* Perfil */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
        <Card className="border-none shadow-none bg-transparent">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={user?.user_metadata?.avatar_url || "/avatars/avatar9.png"}
                alt="avatar"
                className="block w-20 h-20 rounded-full object-cover bg-white/30 p-1 ring-2 ring-white ring-offset-2"
              />
              <button
                onClick={() => setSettingsOpen(true)}
                className="absolute -bottom-1 right-1 bg-white/90 p-1.5 rounded-full text-[#88b863] hover:bg-white transition shadow-sm"
              >
                <Settings size={14} />
              </button>
            </div>

            <div className="text-left text-white">
              <h1 className="text-lg font-semibold">
                {user?.user_metadata?.first_name || "Usuario"}
              </h1>
              <p className="text-sm opacity-80">{user?.email}</p>
              <span className="text-xs opacity-70">Área: Nutrición</span>
            </div>
          </div>
        </Card>

        <ProfileSettingsDrawer
          open={settingsOpen}
          setOpen={setSettingsOpen}
          user={user}
          setUser={() => {}}
        />
      </div>

      {/* Filtros nutricionales */}
      <div className="flex flex-col gap-4 px-6 py-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/80" /> Filtros
        </h2>

        {/* Objetivo */}
        <select
          className="bg-[#6b9762] backdrop-blur-md text-white rounded-full px-4 py-2 text-sm outline-none"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
            handleFilterChange({ goal: e.target.value });
          }}
        >
          <option value="All">Objetivo</option>
          <option value="mass">Ganar masa muscular</option>
          <option value="weight-loss">Bajar de peso</option>
          <option value="energy">Aumentar energía</option>
          <option value="balance">Mantener equilibrio</option>
        </select>

        {/* Tipo de comida */}
        <select
          className="bg-[#6b9762] backdrop-blur-md text-white rounded-full px-4 py-2 text-sm outline-none"
          value={mealType}
          onChange={(e) => {
            setMealType(e.target.value);
            handleFilterChange({ mealType: e.target.value });
          }}
        >
          <option value="All">Tipo de comida</option>
          <option value="protein">Alta en proteína</option>
          <option value="low-fat">Baja en grasa</option>
          <option value="vegan">Vegana</option>
          <option value="vegetarian">Vegetariana</option>
          <option value="keto">Keto</option>
        </select>

        {/* Nivel calórico */}
        <select
          className="bg-[#6b9762] backdrop-blur-md text-white rounded-full px-4 py-2 text-sm outline-none"
          value={calorieLevel}
          onChange={(e) => {
            setCalorieLevel(e.target.value);
            handleFilterChange({ calorieLevel: e.target.value });
          }}
        >
          <option value="All">Nivel calórico</option>
          <option value="low">Bajo en calorías</option>
          <option value="medium">Medio</option>
          <option value="high">Alto en calorías</option>
        </select>
      </div>

      {/* Secciones */}
      {/* <nav className="flex-1 px-4 py-6 border-t border-white/10">
        <ul className="space-y-3">
          {nutritionCategories.map((item) => (
            <li
              key={item}
              onClick={() => setActiveSection(item)}
              className="flex items-center gap-3 px-4 py-2 rounded-full text-white hover:bg-white/20 hover:shadow-md cursor-pointer transition"
            >
              <Utensils size={14} className="opacity-90" />
              {item}
            </li>
          ))}
        </ul>
      </nav> */}
    </aside>
  );
}
