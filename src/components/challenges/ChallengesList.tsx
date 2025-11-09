"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";

export default function ChallengesList({ user }: any) {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: allChallenges } = await supabase.from("challenges").select("*");
      setChallenges(allChallenges || []);

      const { data: progress } = await supabase
        .from("user_challenges")
        .select("challenge_id, progress, completed")
        .eq("user_id", user.id);

      setUserProgress(
        Object.fromEntries(progress?.map((p) => [p.challenge_id, p]) || [])
      );
    };
    fetchData();
  }, [user]);

  const handleProgress = async (challenge: any) => {
    const current = userProgress[challenge.id] || { progress: 0, completed: false };
    const newProgress = current.progress + 1;
    const completed = newProgress >= challenge.target;

    await supabase.from("user_challenges").upsert({
      user_id: user.id,
      challenge_id: challenge.id,
      progress: newProgress,
      completed,
      completed_at: completed ? new Date() : null,
    });

    setUserProgress({
      ...userProgress,
      [challenge.id]: { progress: newProgress, completed },
    });
  };

  return (
    <section className="p-6 space-y-4">
      {challenges.map((ch) => {
        const userCh = userProgress[ch.id] || { progress: 0, completed: false };
        const completed = userCh.completed;

        return (
          <div
            key={ch.id}
            className={`p-4 rounded-xl border ${
              completed ? "bg-green-50 border-green-400" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{ch.title}</h3>
                <p className="text-sm text-gray-600">{ch.description}</p>
              </div>

              <div className="text-right">
                {completed ? (
                  <span className="text-green-600 font-bold">✔ Completado</span>
                ) : (
                  <button
                    onClick={() => handleProgress(ch)}
                    className="bg-[#617c5b] hover:bg-[#4e6548] text-white px-4 py-2 rounded-full text-xs transition"
                  >
                    +1 progreso
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Progreso: {userCh.progress}/{ch.target} | Recompensa: {ch.reward_xp} XP
            </p>
          </div>
        );
      })}
    </section>
  );
}
