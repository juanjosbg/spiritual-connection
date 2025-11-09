"use client";
import { useEffect, useState } from "react";
import {
  fetchFreesoundSounds,
  type RelaxingSound,
} from "@/lib/meditation/audio/fetchFreesoundSounds";

import CategorySelector from "./CategorySelector";
import SoundSearchBar from "./SoundSearchBar";
import SoundCard from "./SoundCard";

const CATEGORIES = [
  "relaxation",
  "meditation",
  "rain",
  "ocean",
  "forest",
  "wind",
  "tibetan bowls",
  "nature",
  "instrumental",
  "zen",
];

export default function MeditationSounds({
  defaultQuery = "relaxing ambient",
}: {
  defaultQuery?: string;
}) {
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState("relaxation");
  const [loading, setLoading] = useState(false);
  const [sounds, setSounds] = useState<RelaxingSound[]>([]);

  const doSearch = async (q: string, cat?: string) => {
    setLoading(true);
    const finalQuery = `${q} ${cat || category} meditation music`;
    const data = await fetchFreesoundSounds(finalQuery);
    setSounds(data);
    setLoading(false);
  };

  useEffect(() => {
    doSearch(defaultQuery);
  }, []);

  return (
    <section className="p-6 mt-7">
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <CategorySelector
          category={category}
          setCategory={setCategory}
          categories={CATEGORIES}
          onCategoryChange={(cat) => doSearch(query, cat)}
        />
        <SoundSearchBar query={query} setQuery={setQuery} onSearch={() => doSearch(query, category)} />
        <button
          onClick={() => doSearch(query, category)}
          className="px-4 py-2 rounded-full bg-[#699746] hover:bg-[#699944] text-white transition"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Cargando sonidos…</p>
      ) : sounds.length === 0 ? (
        <p className="text-sm text-gray-500">
          Sin resultados. Prueba con otra palabra o categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {sounds.map((s) => (
            <SoundCard key={s.id} sound={s} />
          ))}
        </div>
      )}
    </section>
  );
}
