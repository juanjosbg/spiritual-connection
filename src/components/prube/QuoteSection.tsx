import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { DashBoard } from "@/components/dashboard/DashBoard";
import { fetchZenQuotes } from "@/lib/meditation/fetchZenQuotes";
import { MeditationPlayer } from "@/components/prube/MeditationPlayer";

import { Quote as QuoteIcon,Thermometer,Heart} from "lucide-react";
import { type MeditationVideo, fetchYouTubeMeditations} from "@/lib/meditation/fetchYouTubeMeditations";
import type { Quote } from "@/lib/meditation/fetchZenQuotes";

export const QuoteSection = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [videos, setVideos] = useState<MeditationVideo[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchZenQuotes().then((q) => mounted && setQuote(q));
    fetchYouTubeMeditations("relaxing ambient music").then(
      (v) => mounted && setVideos(v)
    );
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 pl-10 pr-10">
      <Card className="p-4 rounded-2xl bg-white text-center border-0">
        <Thermometer className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
        <h2 className="text-sm text-gray-800">Room Temp</h2>
        <p className="text-xl font-light text-gray-400">24°C</p>
      </Card>

      <Card className="p-4 rounded-2xl bg-white border-0 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-100/70 dark:bg-rose-300/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-rose-400" />
          </div>
          <h3 className="text-lg font-light text-gray-800 mb-2">
            Bienestar Integral
          </h3>
          <p className="text-base md:text-lg font-light italic text-slate-800/90">
            Herramientas para sanar mente, cuerpo y energía en un solo lugar.
          </p>
        </div>
      </Card>

      <Card className="p-4 rounded-2xl bg-white text-center col-span-2 md:col-span-1 border-0">
        <QuoteIcon className="w-7 h-7 mx-auto mb-3 text-indigo-400" />
        {quote ? (
          <>
            <h3 className="text-lg font-light text-gray-800 mb-2">
              Relax Mode 🌿
            </h3>
            <p className="text-base md:text-lg font-light italic text-slate-800/90">
              “{quote.q}”
            </p>
            <p className="mt-2 text-sm text-slate-600/80">— {quote.a}</p>
          </>
        ) : (
          <p className="text-gray-400">Cargando frase...</p>
        )}
      </Card>

      <Card className="p-6 col-span-2 rounded-2xl text-center bg-white backdrop-blur-md border-0">
        <DashBoard />
      </Card>

      {/* 🕊️ Bloque con reproductor */}
      <Card className="p-4 md:p-6 rounded-2xl bg-white text-center col-span-2 md:col-span-1 border-0">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          For each day 🎧
        </h3>

        {videos.length > 0 ? (
          <MeditationPlayer videos={videos} />
        ) : (
          <p className="text-sm text-gray-400">Cargando video...</p>
        )}
      </Card>
    </div>
  );
};
