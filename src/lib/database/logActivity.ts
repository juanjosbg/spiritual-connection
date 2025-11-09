import { supabase } from "@/lib/database/supabaseClient";

export async function logUserActivity() {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  const { data: existing } = await supabase
    .from("user_activity")
    .select("id")
    .eq("user_id", user.id)
    .eq("login_date", today)
    .maybeSingle();

  if (!existing) {
    await supabase.from("user_activity").insert({
      user_id: user.id,
      login_date: today,
      completed_tasks: 0,
    });
  }
}

/**
 * 🧘‍♀️ Registra una sesión de meditación completada.
 * Guarda minutos en user_tasks y actualiza user_activity.
 */
export async function logMeditationSession(userId: string, minutes: number) {
  await supabase.from("user_tasks").insert({
    user_id: userId,
    title: "Sesión de meditación",
    category: "meditation",
    status: "completed",
    minutes,
    completed_at: new Date().toISOString(),
  });

  const today = new Date().toISOString().split("T")[0];

  const { data: existing } = await supabase
    .from("user_activity")
    .select("id, completed_tasks")
    .eq("user_id", userId)
    .eq("login_date", today)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("user_activity")
      .update({ completed_tasks: existing.completed_tasks + 1 })
      .eq("id", existing.id);
  } else {
    await supabase.from("user_activity").insert({
      user_id: userId,
      login_date: today,
      completed_tasks: 1,
    });
  }

  const gainedXp = Math.floor(minutes / 5);

  const { data: levelData } = await supabase
    .from("user_levels")
    .select("id, xp, level")
    .eq("user_id", userId)
    .eq("category", "meditation")
    .maybeSingle();

  if (levelData) {
    const newXp = (levelData.xp || 0) + gainedXp;
    let newLevel = levelData.level || "beginner";

    if (newXp >= 100 && newLevel === "beginner") newLevel = "intermediate";
    if (newXp >= 200 && newLevel === "intermediate") newLevel = "advanced";

    await supabase
      .from("user_levels")
      .update({ xp: newXp, level: newLevel })
      .eq("id", levelData.id);
  } else {
    await supabase.from("user_levels").insert({
      user_id: userId,
      category: "meditation",
      xp: gainedXp,
      level: "beginner",
    });
  }

  console.log(`✅ Se registró ${gainedXp} XP (${minutes} min)`);
}
