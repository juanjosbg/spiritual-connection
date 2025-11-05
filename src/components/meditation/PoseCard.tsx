"use client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Pose } from "@/lib/meditation/yogaApi";
import { AuthModal } from "@/components/ui/AuthModal";
import { supabase } from "@/lib/database/supabaseClient";

type Size = "sm" | "md";

interface PoseCardProps {
  pose: Pose;
  size?: Size;
}

export function PoseCard({ pose, size = "md" }: PoseCardProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isSm = size === "sm";

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user);
    };
    checkSession();
  }, []);

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
          "rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-[1.02] bg-[#FFFDF6]",
          "from-white/90 to-indigo-50 border border-white/20",
          isSm ? "p-0" : "p-4",
        ].join(" ")}
      >
        <img
          src={
            pose.url_png ||
            "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop"
          }
          alt={pose.english_name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />

        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 uppercase dark:text-gray-500 mb-1">
            {pose.english_name}
          </h3>

          {pose.sanskrit_name && (
            <p className="text-xs  text-gray-700 mb-2">
              ({pose.sanskrit_name})
            </p>
          )}

          {pose.pose_benefits && (
            <p className="text-xs text-gray-700 line-clamp-2">
              {pose.pose_benefits}
            </p>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-[#617c5b] font-medium">
              {(pose.difficulty || "Beginner") +
                " • " +
                (pose.duration || "10") +
                " min"}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setShowInfoModal(true)}
                className="bg-[#617c5b] hover:bg-[#4e6548] hover:shadow-md text-white text-xs px-3 py-1 rounded-full transition"
              >
                Ver más
              </button>

              <Link
                to={`/meditation/pose/${pose.id}`}
                onClick={handleStart}
                className="bg-[#617c5b] hover:bg-[#4e6548] hover:shadow-md text-white text-xs px-3 py-1 rounded-full transition"
              >
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative shadow-xl">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>

            <div className="flex items-center flex-row mb-2">
              <img
                src={pose.url_png}
                alt={pose.english_name}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />

              <div className="px-4">
                <h2 className="text-4xl font-bold text-[#617c5b] uppercase mb-1">
                  {pose.english_name}
                </h2>
                {pose.sanskrit_name && (
                  <p className="text-2xs text-gray-700 mb-2">
                    ({pose.sanskrit_name})
                  </p>
                )}
              </div>
            </div>

            <div className="px-2 text-justify">
              <p className="text-2md text-gray-700 leading-relaxed mb-4">
                {pose.pose_benefits ||
                  "Esta postura ayuda a mejorar la concentración y flexibilidad."}
              </p>

              <div className="text-md text-[#617c5b] font-medium">
                Dificultad: {pose.difficulty || "Beginner"} • Duración:{" "}
                {pose.duration || "10"} min
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
