import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { supabase } from "@/lib/database/supabaseClient";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) return <div className="p-10 text-center">🧘 Cargando...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
