import { Link } from "react-router-dom";
import { useState } from "react";
import type { Pose } from "@/lib/meditation/yogaApi";
import { AuthModal } from "@/components/ui/AuthModal";

type Size = "sm" | "md";
interface PoseCardProps {
  pose: Pose;
  size?: Size;
}

export function PoseCard({ pose, size = "md" }: PoseCardProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isSm = size === "sm";

  const isLoggedIn = false;

  const handleStart = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div
        className={[
          "rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-[1.02]",
          "from-white/90 to-indigo-50 dark:from-gray-800/70 dark:to-gray-900/50 border border-white/40 dark:border-gray-700",
          isSm ? "p-0" : "p-4",
        ].join(" ")}
      >
        <img
          src={pose.url_png || "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop"}
          alt={pose.english_name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {pose.english_name}
          </h3>

          {pose.sanskrit_name && (
            <p className="text-xs italic text-gray-500 dark:text-gray-400 mb-2">
              ({pose.sanskrit_name})
            </p>
          )}

          {pose.pose_benefits && (
            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
              {pose.pose_benefits}
            </p>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              {(pose.difficulty || "Beginner") + " • " + (pose.duration || "10")} min
            </span>

            <div className="flex gap-2">
              <Link
                to={`/meditation/pose/${pose.id}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded-full"
              >
                Ver más
              </Link>

              <Link
                to={`/meditation/pose/${pose.id}`}
                onClick={handleStart}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded-full"
              >
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
