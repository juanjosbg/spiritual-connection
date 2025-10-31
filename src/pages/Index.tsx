import { useState, useEffect } from "react";
import { QuoteSection } from "@/components/meditation/QuoteSection";
import { MeditationSection } from "@/components/MeditationSection";
import { BreathingExercise } from "@/components/BreathingExercise";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Sparkles, Wind, Heart, Flower2, Music } from "lucide-react";
import {
  fetchRelaxMusic,
  type RelaxTrack,
} from "@/lib/meditation/fetchRelaxMusic";

const Index = () => {
  const [activeSection, setActiveSection] = useState<
    "home" | "meditate" | "breathe"
  >("home");
  const [tracks, setTracks] = useState<RelaxTrack[]>([]);

  useEffect(() => {
    if (activeSection === "home") {
      fetchRelaxMusic("ambient meditation").then(setTracks);
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gradient-to-b  from-rose-50 via-indigo-50 to-sky-50 ">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="container mx-auto px-4 py-10">
        {activeSection === "home" && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative px-6 md:px-10 py-12">
              <div className="text-center relative">
                <div className="inline-block animate-float">
                  <Flower2 className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                </div>
                <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-800 dark:text-gray-100 uppercase">
                  Tu camino hacia el equilibrio
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
                  Una experiencia para reconectar cuerpo, mente y espíritu 🌿
                </p>
              </div>
            </section>

            {/* Contenido Rapido */}
            <QuoteSection />

            {/* Categorias */}
            
            {/* MÚSICA RELAJANTE */}
            {tracks.length > 0 && (
              
              <section className="space-y-6 mt-6 ">
                <div className="flex items-center justify-center gap-2">
                  <Music className="w-6 h-6 text-indigo-400 " />
                  <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 ">
                    Sonidos para el alma
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6 ">
                  {tracks.slice(0, 3).map((track) => (
                    <Card
                      key={track.id}
                      className="
                        p-4 sm:p-6 rounded-2xl
                        bg-white/55 dark:bg-white/[0.06]
                        border border-white/50 dark:border-white/10
                        backdrop-blur-xl hover:shadow-xl transition-all
                      "
                    >
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-full h-40 object-cover rounded-xl mb-4 opacity-95 hover:opacity-100 transition-opacity"
                      />
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {track.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {track.artist}
                      </p>
                      <audio
                        controls
                        src={track.audio}
                        className="w-full mt-3"
                      />
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* ACCIONES PRINCIPALES */}
            <section className="grid md:grid-cols-3 gap-6">
              <Card className="border-none">
              </Card>

              <Card
                className="
                  p-6 rounded-2xl cursor-pointer
                  bg-white/55 dark:bg-white/[0.06]
                  border border-white/50 dark:border-white/10
                  backdrop-blur-xl shadow-lg hover:shadow-xl transition-all
                "
                onClick={() => setActiveSection("meditate")}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100/70 dark:bg-indigo-300/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Meditación Guiada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sesiones de 5, 10 y 15 minutos para calmar tu mente y
                    conectar con tu interior.
                  </p>
                </div>
              </Card>

              <Card
                className="
                  p-6 rounded-2xl cursor-pointer
                  bg-white/55 dark:bg-white/[0.06]
                  border border-white/50 dark:border-white/10
                  backdrop-blur-xl shadow-lg hover:shadow-xl transition-all
                "
                onClick={() => setActiveSection("breathe")}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100/70 dark:bg-sky-300/20 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Respiración Consciente
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Técnicas 4-7-8, box breathing y pranayama para reducir
                    ansiedad.
                  </p>
                </div>
              </Card>
            </section>
          </div>
        )}

        {activeSection === "meditate" && <MeditationSection />}
        {activeSection === "breathe" && <BreathingExercise />}
      </main>

      <footer className="border-t border-white/40 dark:border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
          <p>© 2025 MindBalance — Encuentra tu paz interior 🌙</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
