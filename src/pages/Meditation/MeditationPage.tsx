"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { fetchAllPoses, type Pose } from "@/lib/meditation/yogaApi";
import { QuizMeditation } from "@/components/meditation/QuizMeditation";
import { MeditationSidebar } from "./MeditationSidebar";
import { MeditationContent } from "./MeditationContent";
import { MeditationEmptyState } from "@/pages/Meditation/MeditationEmptyState";
import MeditationSounds from "@/components/meditation/MeditationSounds/MeditationSounds";
import { Bell } from "lucide-react";
import ChallengesDrawer from "@/components/challenges/ChallengesDrawer";
import GratitudeJournal from "@/components/meditation/GratitudeJournal";

export default function MeditationPage() {
  const [user, setUser] = useState<any>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [filtered, setFiltered] = useState<Pose[]>([]);
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("All");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Yoga y posturas");
  const [openChallenges, setOpenChallenges] = useState(false);

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
  }, []);

  useEffect(() => {
    fetchAllPoses()
      .then((data) => {
        setPoses(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
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

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">
        🧘 Cargando tus rutinas...
      </div>
    );

  if (!user) return <MeditationEmptyState />;
  if (!level) return <QuizMeditation userId={user.id} onComplete={setLevel} />;

  return (
    <div className="relative min-h-screen flex mt-12">
      <MeditationSidebar
        user={user}
        level={level}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        duration={duration}
        setDuration={setDuration}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 space-y-10 p-4 md:p-10 relative">
        <button
          onClick={() => setOpenChallenges(true)}
          className="fixed top-20 right-6 z-20 flex items-center gap-2 bg-[#88b863] hover:bg-[#699944] text-white px-4 py-2 rounded-full shadow-md transition"
        >
          <Bell size={18} />
          Retos diarios
        </button>

        <ChallengesDrawer open={openChallenges} setOpen={setOpenChallenges} />

        {activeSection === "Yoga y posturas" && (
          <MeditationContent user={user} level={level} filtered={filtered} />
        )}

        {activeSection === "Relajación sonora" && (
          <MeditationSounds defaultQuery="rain" />
        )}

        {activeSection === "Sesiones guiadas" && (
          <div className="p-8 bg-white rounded-xl text-center text-gray-600 shadow">
            ✨ Muy pronto podrás acceder a sesiones guiadas personalizadas.
          </div>
        )}

        {activeSection === "Respiración consciente" && (
          <div className="p-8 bg-white rounded-xl text-center text-gray-600 shadow">
            🌬️ Pronto podrás practicar ejercicios de respiración consciente.
          </div>
        )}

        {activeSection === "Diario de gratitud" && (
          <GratitudeJournal />
        )}
      </div>
    </div>
  );
}
