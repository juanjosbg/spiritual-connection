"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { fetchAllPoses, type Pose } from "@/lib/meditation/yogaApi";
import { QuizMeditation } from "@/components/meditation/QuizMeditation";
import { MeditationSidebar } from "./MeditationSidebar";
import { MeditationContent } from "./MeditationContent";
import { MeditationEmptyState } from "@/pages/Meditation/MeditationEmptyState";

import ChallengesList from "@/components/challenges/ChallengesList";
import UserProgress from "@/components/challenges/UserProgress";

export default function MeditationPage() {
  const [user, setUser] = useState<any>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [filtered, setFiltered] = useState<Pose[]>([]);
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
      />
      <div className="flex-1 space-y-10">
        <MeditationContent user={user} level={level} filtered={filtered} />
        <ChallengesList user={user} />
      </div>
    </div>
  );
}
