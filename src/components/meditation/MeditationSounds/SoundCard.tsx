// components/meditation/MeditationSounds/SoundCard.tsx
import { Headphones, Download } from "lucide-react";
import type { RelaxingSound } from "@/lib/meditation/audio/fetchFreesoundSounds";

export default function SoundCard({ sound }: { sound: RelaxingSound }) {
  return (
    <article
      key={sound.id}
      className="rounded-2xl border border-[#88b863]/30 bg-[#FFFDF6] p-4 hover:shadow-md transition"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-[#88b863]/20 flex items-center justify-center">
          <Headphones className="w-5 h-5 text-[#699944]" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate" title={sound.name}>
            {sound.name}
          </h3>
          <p className="text-xs text-gray-500">
            por <span className="font-medium">{sound.username}</span> •{" "}
            {(sound.duration / 60).toFixed(1)} min
          </p>
        </div>
      </div>

      <audio
        controls
        className="w-full mt-3 accent-[#699944]"
        src={sound.url}
        preload="none"
      />

      <div className="flex justify-between items-center mt-3">
        <span className="text-[11px] text-gray-500">
          Licencia: {sound.license?.toUpperCase() || "N/D"}
        </span>
        <a
          href={sound.url}
          download
          className="inline-flex items-center gap-1 text-xs bg-[#88b863] hover:bg-[#699944] text-white px-3 py-1.5 rounded-full transition"
        >
          <Download className="w-3.5 h-3.5" />
          Descargar
        </a>
      </div>
    </article>
  );
}
