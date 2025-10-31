import { PlayCircle } from "lucide-react";

interface MeditationCardProps {
  title: string;
  description: string;
  thumbnail: string;
  onSelect: () => void;
}

export const MeditationCard = ({ title, description, thumbnail, onSelect }: MeditationCardProps) => {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer group bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 
      dark:from-[#1a1f2c] dark:via-[#1e293b] dark:to-[#283548]
      rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-xl group-hover:opacity-80 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-xl">
          <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};
