import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";

export default function UserProgress({ user }: any) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState("Beginner");
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await supabase
        .from("user_levels")
        .select("xp, level")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setXp(data.xp);
        setLevel(data.level);
      }

      const { data: badges } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id);
      setAchievements(badges || []);
    };
    fetchProgress();
  }, [user]);

  const progress = Math.min((xp / 100) * 100, 100);

  return (
    <div className="my-4 mx-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-900 mb-2">Tu progreso 🌸</p>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-[#617c5b] rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-[#617c5b] mt-1">{xp}/100 XP</p>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Nivel actual: <b>{level}</b>
        </p>
      </div>

      <div className="mt-5">
        <h3 className="text-sm text-gray-600 mb-2">Logros obtenidos:</h3>
        <div className="flex flex-wrap gap-2">
          {achievements.length === 0 && (
            <p className="text-xs text-gray-400">Aún no tienes logros 🧘‍♂️</p>
          )}
          {achievements.map((a) => (
            <div
              key={a.id}
              className="px-3 py-2 rounded-full bg-[#f0f7ef] text-[#617c5b] text-xs"
            >
              {a.icon} {a.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
