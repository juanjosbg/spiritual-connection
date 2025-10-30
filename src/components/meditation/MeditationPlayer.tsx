import { useState } from "react";
import { Play, Pause } from "lucide-react";

interface MeditationPlayerProps {
  videos: {
    id: string;
    title: string;
    thumbnail?: string;
  }[];
}

export const MeditationPlayer = ({ videos }: MeditationPlayerProps) => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videos || videos.length === 0) {
    return <p className="text-gray-400">No hay videos disponibles</p>;
  }

  return (
    <div className="space-y-4">
      <div
        className="p-6 rounded-2xl bg-gradient-to-br 
        from-[#f9f7ff] via-[#f3f0ff] to-[#ece9ff]
        dark:from-[#1a1a2e] dark:via-[#1f203a] dark:to-[#232444]
        shadow-lg text-center transition-all"
      >
        <h4 className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Deep Relax Session
        </h4>

        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-1">
          {currentVideo.title}
        </h2>

        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="mt-3 p-4 rounded-full bg-indigo-400 text-white shadow-md hover:bg-indigo-500 transition"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>

        {isPlaying && (
          <div className="mt-4 aspect-video rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
              title={currentVideo.title}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => {
              setCurrentVideo(video);
              setIsPlaying(true);
            }}
            className={`rounded-xl overflow-hidden border-2 transition-all duration-300
              ${
                video.id === currentVideo.id
                  ? "border-indigo-400 scale-105"
                  : "border-transparent hover:border-indigo-200"
              }`}
          >
            <img
              src={video.thumbnail || ""}
              alt={video.title}
              className="w-full h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
