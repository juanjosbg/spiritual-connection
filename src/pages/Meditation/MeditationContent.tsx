import { Sparkles } from "lucide-react";
import { PoseCard } from "@/components/meditation/PoseCard";

export function MeditationContent({ user, level, filtered }: any) {
  return (
    <main className="flex-1 pt-20 p-6 md:p-10 transition-all">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-wide">
            Explora tus Rutinas de Yoga
          </h2>
          <p className="text-sm text-indigo-300 mt-1">
            Bienvenido {user?.user_metadata?.first_name || ""}, estás en nivel{" "}
            <b>{level}</b> 🌿
          </p>
        </div>
        <Sparkles className="w-10 h-10 text-indigo-400 animate-float" />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((pose: any) => (
          <PoseCard key={pose.id} pose={pose} size="sm" />
        ))}
      </section>
    </main>
  );
}
