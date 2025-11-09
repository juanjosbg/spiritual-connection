// src/pages/Favorites.tsx
"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/database/supabaseClient";

export default function Favorites() {
  const session = useSession();
  const user = session?.user;
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setFavorites(data || []));
  }, [user]);

  if (!user) return <p className="p-6">Debes iniciar sesión para ver tus favoritos.</p>;

  return (
    <section className="p-6 mt-16 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#699944] mb-4">
        💚 Tus sonidos favoritos
      </h2>

      {favorites.length === 0 ? (
        <p className="text-sm text-gray-500">Aún no tienes favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {favorites.map((f) => (
            <article
              key={f.id}
              className="rounded-2xl border border-[#88b863]/30 bg-[#FFFDF6] p-4 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800 truncate" title={f.sound_name}>
                {f.sound_name}
              </h3>
              <p className="text-xs text-gray-500">
                por <span className="font-medium">{f.username || "—"}</span> •{" "}
                {f.duration ? (f.duration / 60).toFixed(1) : "—"} min
              </p>

              <audio
                controls
                className="w-full mt-3 accent-[#699944]"
                src={f.sound_url}
                preload="none"
              />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
