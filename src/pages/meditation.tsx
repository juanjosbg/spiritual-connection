"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Filter } from "lucide-react";
import { supabase } from "@/lib/database/supabaseClient";
import { Card } from "@/components/ui/card";
import { fetchAllPoses, type Pose } from "@/lib/meditation/yogaApi";
import { PoseCard } from "@/components/meditation/PoseCard";
import { QuizMeditation } from "@/components/meditation/QuizMeditation";
import { Link } from "react-router-dom";

const subCategories = [
  { name: "Mis rutinas", href: "#" },
  { name: "Música", href: "#" },
  { name: "Retos", href: "#" },
  { name: "Logros", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MeditationPage() {
  const [user, setUser] = useState<any>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [filtered, setFiltered] = useState<Pose[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("All");

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("user_levels")
          .select("level")
          .eq("user_id", user.id)
          .eq("category", "meditation")
          .single();

        if (!error && data) setLevel(data.level);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    fetchAllPoses()
      .then((data) => {
        setPoses(data);
        setFiltered(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = poses;
    if (difficulty !== "All") {
      temp = temp.filter(
        (pose) =>
          pose.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
    }
    if (duration !== "All") {
      temp = temp.filter((pose) => pose.duration === duration);
    }
    setFiltered(temp);
  }, [difficulty, duration, poses]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">
        🧘 Cargando poses de yoga...
      </div>
    );

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          🔒 Necesitas iniciar sesión
        </h2>
        <p className="text-gray-600 mb-6">
          Inicia sesión o regístrate para descubrir tu nivel de meditación y acceder a tus rutinas personalizadas.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition"
          >
            Registrarme
          </Link>
        </div>
      </div>
    );
  }

  if (!level) {
    return <QuizMeditation userId={user.id} onComplete={setLevel} />;
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen mt-12">
        <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-6 py-6">
            <Card className="border-none shadow-none bg-transparent">
              <div className="flex items-start gap-2">
                <div className="h-10 w-10 rounded-full from-indigo-400 to-emerald-400 p-1">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-xl font-bold text-indigo-600">
                    {user?.user_metadata?.first_name
                      ? user.user_metadata.first_name.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                </div>

                <div>
                  <h1 className="text-xl font-bold uppercase text-gray-100">
                    {user?.user_metadata?.first_name
                      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
                      : "Usuario sin nombre"}
                  </h1>
                  <p className="mb-1 text-sm text-indigo-300">
                    {user?.email || "Correo no disponible"}
                  </p>
                  <span className="text-xs text-indigo-400">Nivel: {level}</span>
                </div>
              </div>
            </Card>
          </div>

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

          <nav className="flex-1 px-4 py-6 border-t border-indigo-800/30">
            <ul className="space-y-2">
              {subCategories.map((item) => (
                <li
                  key={item.name}
                  className={classNames(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-indigo-200 hover:bg-indigo-800/40 cursor-pointer"
                  )}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 pt-20 p-6 md:p-10 transition-all">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-wide">
                Explora tus Rutinas de Yoga
              </h2>
              <p className="text-sm text-indigo-300 mt-1">
                Bienvenido {user?.user_metadata?.first_name || ""}, estás en nivel <b>{level}</b> 🌿
              </p>
            </div>
            <Sparkles className="w-10 h-10 text-indigo-400 animate-float" />
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pose) => (
              <PoseCard key={pose.id} pose={pose} size="sm" />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
