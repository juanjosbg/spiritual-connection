"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { fetchAllPoses, type Pose } from "@/lib/meditation/yogaApi";
import { QuizMeditation } from "@/components/meditation/QuizMeditation";
import { MeditationContent } from "./MeditationContent";
import { MeditationEmptyState } from "@/pages/Meditation/MeditationEmptyState";
import MeditationSelector from "@/components/meditation/MeditationSelector";
import MeditationSounds from "@/components/meditation/MeditationSounds/MeditationSounds";
import GratitudeJournal from "@/components/meditation/GratitudeJournal";
import { MeditationSidebar } from "./MeditationSidebar";
import LoadInfoMeditation from "@/components/load/loadInfoMeditation";

export default function MeditationPage() {
  const [user, setUser] = useState<any>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [filtered, setFiltered] = useState<Pose[]>([]);
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("user_levels")
          .select("level")
          .eq("user_id", user.id)
          .eq("category", "meditation")
          .single();
        if (data) setLevel(data.level);
      }
    };

    getUserData();

    fetchAllPoses().then((data) => {
      setPoses(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let temp = poses;
    if (difficulty !== "All") {
      temp = temp.filter(
        (p) => p.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
    }
    if (duration !== "All") {
      temp = temp.filter((p) => p.duration === duration);
    }
    setFiltered(temp);
  }, [difficulty, duration, poses]);

  useEffect(() => {
    if (selectedMode) {
      setShowLoader(true);
      const timer = setTimeout(() => setShowLoader(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [selectedMode, level]);

  if (loading)
    return <div className="p-10 text-center text-gray-400">🧘 Cargando...</div>;

  if (!user) return <MeditationEmptyState />;

  if (!selectedMode)
    return <MeditationSelector onSelect={(mode) => setSelectedMode(mode)} />;

  // 🔹 Loader general para todos los modos
  if (showLoader) return <LoadInfoMeditation />;

  // 🔹 Interfaz principal (igual que antes)
  return (
    <div className="relative min-h-screen flex mt-12">
      <MeditationSidebar
        user={user}
        level={level}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        duration={duration}
        setDuration={setDuration}
        setActiveSection={setSelectedMode}
      />

      <div className="flex-1 space-y-10 p-4 md:p-10 relative transition-all">
        {selectedMode === "yoga" && (
          !level ? (
            <QuizMeditation userId={user.id} onComplete={setLevel} />
          ) : (
            <MeditationContent user={user} level={level} filtered={filtered} />
          )
        )}

        {selectedMode === "music" && <MeditationSounds defaultQuery="rain" />}

        {selectedMode === "journal" && <GratitudeJournal />}

        {selectedMode === "breathing" && (
          <div className="p-8 bg-white rounded-xl text-center text-gray-600 shadow">
            🌬️ Ejercicios de respiración próximamente.
          </div>
        )}
      </div>
    </div>
  );
}
