import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";

export function useSession() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = supabase.auth.getSession();
    currentSession.then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return session;
}
