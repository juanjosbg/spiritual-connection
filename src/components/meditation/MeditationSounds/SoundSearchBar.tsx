// components/meditation/MeditationSounds/SoundSearchBar.tsx
import { Search } from "lucide-react";

interface SoundSearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
}

export default function SoundSearchBar({
  query,
  setQuery,
  onSearch,
}: SoundSearchBarProps) {
  return (
    <div className="flex items-center gap-2 flex-1 bg-[#88b863]/40 border border-[#88b863]/30 rounded-full px-4">
      <Search className="w-4 h-4 text-[#ffff]" />
      <input
        className="w-full bg-transparent py-2 outline-none text-[#ffff] placeholder:text-[#e6e6e6]"
        placeholder="Buscar sonidos (ej: calm, ambient, yoga...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
    </div>
  );
}
