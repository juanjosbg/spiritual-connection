import { Filter } from "lucide-react";
import { Card } from "@/components/ui/card";

const subCategories = [
  "Mis rutinas",
  "Música",
  "Retos",
  "Logros",
];

export function MeditationSidebar({
  user,
  level,
  difficulty,
  setDifficulty,
  duration,
  setDuration,
}: any) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-6 py-6">
        <Card className="border-none shadow-none bg-transparent">
          <div className="flex items-start gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-emerald-400 flex items-center justify-center text-xl font-bold text-white">
              {user?.user_metadata?.first_name
                ? user.user_metadata.first_name.charAt(0).toUpperCase()
                : "?"}
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase text-gray-100">
                {user?.user_metadata?.first_name || "Usuario"}
              </h1>
              <p className="text-sm text-indigo-300">{user?.email}</p>
              <span className="text-xs text-indigo-400">Nivel: {level}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 🔹 Filtros */}
      <div className="flex flex-col gap-4 px-6 py-6">
        <h2 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" /> Filtros
        </h2>

        <select
          className="bg-indigo-800/60 rounded-lg px-3 py-2 text-sm outline-none text-white"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="All">Dificultad (Todas)</option>
          <option value="Beginner">Principiante</option>
          <option value="Intermediate">Intermedio</option>
          <option value="Advanced">Avanzado</option>
        </select>

        <select
          className="bg-indigo-800/60 rounded-lg px-3 py-2 text-sm outline-none text-white"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="All">Duración (Todas)</option>
          <option value="10">10 min</option>
          <option value="20">20 min</option>
          <option value="30">30 min</option>
        </select>
      </div>

      {/* 🔹 Subcategorías */}
      <nav className="flex-1 px-4 py-6 border-t border-indigo-800/30">
        <ul className="space-y-2">
          {subCategories.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-200 hover:bg-indigo-800/40 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
