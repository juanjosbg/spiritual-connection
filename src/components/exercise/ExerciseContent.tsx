// src/components/exercise/ExerciseContent.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExercises } from "@/lib/exercise/fetchExercises";

interface ExerciseContentProps {
  filters: { muscle: string; type: string };
}

type Exercise = {
  name: string;
  muscle: string;
  type: string;
  equipment?: string;
  difficulty: string;
  instructions: string;
};

export function ExerciseContent({ filters }: ExerciseContentProps) {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchExercises(filters.muscle, filters.type);
        if (!alive) return;
        setExercises(data || []);
      } catch (_err) {
        if (!alive) return;
        setError("Error al cargar ejercicios");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, [filters]);

  if (loading) {
    return (
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Resultados para <span className="text-green-600">{filters.muscle}</span>{" "}
          ({filters.type})
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1b1b1b]"
            >
              <div className="w-full h-40 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse mb-4" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Resultados para <span className="text-green-600">{filters.muscle}</span>{" "}
        ({filters.type})
      </h1>

      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
      )}

      {!error && exercises.length === 0 && (
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-[#1b1b1b] border border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
          No se encontraron ejercicios para esos filtros. Prueba con otro músculo o tipo.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((ex, index) => {
          const imgQuery = `${ex.name} ${ex.muscle} exercise`;
          return (
            <div
              key={`${ex.name}-${index}`}
              onClick={() => navigate(`/exercise/${encodeURIComponent(ex.name)}`)}
              className="cursor-pointer p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1b1b1b] shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
            >
              <img
                src={`https://source.unsplash.com/400x250/?${encodeURIComponent(
                  imgQuery
                )}`}
                alt={ex.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://cdn-icons-png.flaticon.com/512/2964/2964514.png";
                }}
                className="rounded-lg mb-4 w-full h-40 object-cover"
                loading="lazy"
              />

              <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-1">
                {ex.name}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Músculo:</strong> {ex.muscle}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Dificultad:</strong> {ex.difficulty}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Equipo:</strong> {ex.equipment || "Ninguno"}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                {expandedCard === index
                  ? ex.instructions
                  : `${ex.instructions.substring(0, 110)}...`}
              </p>

              <button
                onClick={(evt) => {
                  evt.stopPropagation();
                  setExpandedCard(expandedCard === index ? null : index);
                }}
                className="text-green-600 hover:text-green-700 font-medium mt-2 text-sm transition"
                type="button"
              >
                {expandedCard === index ? "Leer menos" : "Leer más"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
