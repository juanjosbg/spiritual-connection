import type { Pose } from "@/lib/meditation/yogaApi";

type Size = "sm" | "md";

interface PoseCardProps {
  pose: Pose;
  size?: Size;
}

export function PoseCard({ pose, size = "md" }: PoseCardProps) {
  const isSm = size === "sm";

  return (
    <div
      className={[
        "rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-[1.02] hover:shadow-indigo-500/20",
        "bg-linear-to-b from-white/90 to-indigo-50 dark:from-gray-800/70 dark:to-gray-900/50 border border-white/40 dark:border-gray-700",
        isSm ? "p-0" : "p-4",
      ].join(" ")}
    >
      {/* Imagen */}
      {pose.url_png && (
        <img
          src={pose.url_png}
          alt={pose.english_name}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Contenido */}
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
            {pose.difficulty || "Beginner"} • {pose.duration || "10 min"}
          </span>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}
