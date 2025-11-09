// components/meditation/MeditationSounds/SoundCard.tsx
import { useEffect, useState } from "react";
import { Headphones, Download, Heart } from "lucide-react";
import type { RelaxingSound } from "@/lib/meditation/audio/fetchFreesoundSounds";
import { useSession } from "@/hooks/useSession";
import { useFavorites } from "@/hooks/useFavorites";

export default function SoundCard({ sound }: { sound: RelaxingSound }) {
  const session = useSession();
  const user = session?.user;
  const { toggleFavorite, checkFavorite } = useFavorites(user?.id);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (user) {
        const result = await checkFavorite(sound.id.toString());
        setFav(result);
      }
    };
    load();
  }, [user, sound.id]);

  const handleToggle = async () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar favoritos ✨");
      return;
    }
    await toggleFavorite({ ...sound, id: sound.id.toString() });
    setFav(!fav);
  };

  return (
    <article key={sound.id}
        className="rounded-2xl border border-[#88b863]/30 bg-[#FFFDF6] p-4 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-[#88b863]/20 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-[#699944]" />
          </div>
          <div className="min-w-0">
            <h3
              className="font-semibold text-gray-800 truncate"
              title={sound.name}
            >
              {sound.name}
            </h3>
            <p className="text-xs text-gray-500">
              por <span className="font-medium">{sound.username}</span> •{" "}
              {(sound.duration / 60).toFixed(1)} min
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="text-[#699944] hover:scale-110 transition"
          title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            className={`w-5 h-5 ${
              fav ? "fill-[#fa7283] text-[#fa7283]" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <audio
        controls
        className="w-full mt-3 accent-[#699944]"
        src={sound.url}
        preload="none"
      />
    </article>
  );
}
