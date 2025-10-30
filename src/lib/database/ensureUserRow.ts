import { SupabaseClient, type User } from "@supabase/supabase-js";

export async function ensureUserRow(supabase: SupabaseClient, user: User, nameFallback?: string) {
  const { data: existing, error: readErr } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (readErr) throw readErr;
  if (existing) return { created: false };

  const nameFromMeta =
    (user.user_metadata?.name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    nameFallback ||
    "";

  const { error: upsertErr } = await supabase
    .from("users")
    .upsert(
      { id: user.id, email: user.email, name: nameFromMeta },
      { onConflict: "id" }
    );

  if (upsertErr) throw upsertErr;
  return { created: true };
}
