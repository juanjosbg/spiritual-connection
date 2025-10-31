// src/components/meditation/PoseCard.tsx
import React from "react";
import type { Pose } from "@/lib/meditation/yogaApi"; // 👈 tipo, no valor

interface PoseCardProps {
  pose: Pose;
}

export function PoseCard({ pose }: PoseCardProps) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md border border-white/40 dark:border-gray-700 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-semibold">{pose.english_name}</h3>
      {pose.sanskrit_name && (
        <p className="text-sm italic text-gray-500">({pose.sanskrit_name})</p>
      )}
      {pose.pose_benefits && (
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          <strong>Beneficios:</strong> {pose.pose_benefits}
        </div>
      )}
      {pose.url_png && (
        <img
          src={pose.url_png}
          alt={pose.english_name}
          className="w-full h-auto rounded-lg mt-4"
        />
      )}
    </div>
  );
}
