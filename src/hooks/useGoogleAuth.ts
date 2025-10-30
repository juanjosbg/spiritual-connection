import { supabase } from "@/lib/database/supabaseClient";

export function useGoogleAuth() {
  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) console.error("Error al iniciar sesión:", error.message);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error al cerrar sesión:", error.message);
  };

  return { signIn, signOut };
}
