"use client";

import { useState } from "react";
import { Filter, Settings } from "lucide-react";
import Swal from "sweetalert2";
import { Card } from "@/components/ui/card";
import ProfileSettingsDrawer from "@/components/Profile/ProfileSettingsDrawer";

const subCategories = ["Mis rutinas", "Música", "Retos", "Logros"];

export function MeditationSidebar({
  user,
  level,
  difficulty,
  setDifficulty,
  duration,
  setDuration,
  className = "",
}: any) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

  const getUnlockedLevels = () => {
    const lvl = level?.toLowerCase();
    if (lvl === "beginner") return ["beginner"];
    if (lvl === "intermediate") return ["beginner", "intermediate"];
    if (lvl === "advanced") return ["beginner", "intermediate", "advanced"];
    return [];
  };
  const unlockedLevels = getUnlockedLevels();

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.toLowerCase();

    if (selected !== "all" && !unlockedLevels.includes(selected)) {
      Swal.fire({
        title: "🔒 Nivel bloqueado",
        text: "Todavía te falta para desbloquear este nivel. Participa en actividades para avanzar 🧘‍♀️",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#6366F1",
        background: "#1e1e2f",
        color: "#f1f1f1",
      });
      return;
    }

    setDifficulty(e.target.value);
  };

  return (
    <aside
      className={classNames(
        "hidden md:flex w-[38vh] flex-col border-r border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm",
        className
      )}
    >
      {/* 🔹 Perfil */}
      <div className="flex items-center gap-2 px-6 py-6">
        <Card className="border-none shadow-none bg-transparent">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="p-0.5 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500">
                <img
                  src={user?.user_metadata?.avatar_url || "/avatars/avatar9.png"}
                  alt="avatar"
                  className="block w-20 h-20 rounded-full object-cover bg-gray-100 p-1 ring-2 ring-indigo-500 ring-offset-2 ring-offset-transparent"
                />
              </div>

              <button
                onClick={() => setSettingsOpen(true)}
                className="absolute -bottom-1 right-1 bg-indigo-600 p-1.5 rounded-full text-white hover:bg-indigo-700 transition shadow-sm"
                title="Editar perfil"
              >
                <Settings size={14} />
              </button>
            </div>

            <div className="text-left">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user?.user_metadata?.first_name || "Usuario sin nombre"}
              </h1>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                {user?.email || "Correo no disponible"}
              </p>
              <span className="text-xs text-indigo-400">
                Nivel: {level || "Sin nivel"}
              </span>
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

      {/* 🔹 Filtros */}
      <div className="flex flex-col gap-4 px-6 py-6">
        <h2 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" /> Filtros
        </h2>

        <select
          className="bg-gray-900/90 rounded-full px-5 py-2 text-sm outline-none text-white"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="All">Dificultad (Todas)</option>
          <option value="Beginner">Principiante</option>
          <option value="Intermediate">Intermedio</option>
          <option value="Advanced">Avanzado</option>
        </select>

        <select
          className="bg-gray-900/90 rounded-full px-5 py-2 text-sm outline-none text-white"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="All">Duración (Todas)</option>
          <option value="10">10 min</option>
          <option value="20">20 min</option>
          <option value="30">30 min</option>
        </select>
      </div>

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
