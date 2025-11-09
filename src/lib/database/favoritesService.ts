import { supabase } from "./supabaseClient";

export async function addFavorite(userId: string, sound: any) {
  const { error } = await supabase.from("favorites").insert([
    {
      user_id: userId,
      sound_id: sound.id,
      sound_name: sound.name,
      sound_url: sound.url,
      duration: sound.duration,
      username: sound.username,
      license: sound.license,
    },
  ]);
  if (error) console.error("❌ Error al agregar favorito:", error.message);
}

export async function removeFavorite(userId: string, soundId: string) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("sound_id", soundId);
  if (error) console.error("❌ Error al eliminar favorito:", error.message);
}

export async function isFavorite(userId: string, soundId: string) {
  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("sound_id", soundId)
    .maybeSingle();
  return !!data;
}
