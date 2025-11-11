// src/components/exercise/ExerciseContentDB.tsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExercises } from "@/lib/exercise/fetchExercisesDB";
import type { Exercise } from "@/types";

interface Props {
  muscle?: string;
  type?: string;
}

export default function ExerciseContentDB({ muscle = "all", type = "all" }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Carga inicial de todos los ejercicios (API o fallback)
  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const data = await getAllExercises();
        setExercises(data);
      } catch (error) {
        console.error("❌ Error al cargar ejercicios:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // 🔹 Filtro dinámico local
  const filteredExercises = useMemo(() => {
    if (!exercises.length) return [];

    return exercises.filter((ex) => {
      // Mapeo para traducir nombres de la UI a API (pecho → chest, abdomen → waist, etc.)
      const muscleMap: Record<string, string> = {
        pecho: "chest",
        espalda: "back",
        piernas: "upper legs",
        hombros: "shoulders",
        abdomen: "waist",
        biceps: "upper arms",
        triceps: "upper arms",
        all: "all",
      };

      const normalizedMuscle =
        muscleMap[muscle.toLowerCase()] || muscle.toLowerCase();

      const matchMuscle =
        normalizedMuscle === "all" ||
        ex.bodyPart.toLowerCase().includes(normalizedMuscle) ||
        ex.target.toLowerCase().includes(normalizedMuscle);

      const matchType =
        type === "all" ||
        ex.target.toLowerCase().includes(type.toLowerCase()) ||
        ex.name.toLowerCase().includes(type.toLowerCase());

      return matchMuscle && matchType;
    });
  }, [exercises, muscle, type]);

  // 🔹 Estado de carga
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1b1b1b]"
          >
            <div className="w-full h-40 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // 🔹 Sin resultados
  if (filteredExercises.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-yellow-400 text-center">
        ⚠️ No se encontraron ejercicios que coincidan con tus filtros
      </div>
    );
  }

  // 🔹 Render principal
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExercises.map((ex) => (
        <div
          key={ex.id}
          onClick={() => navigate(`/exercise/${ex.id}`)}
          className="cursor-pointer border border-gray-200 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-[#111827] p-5 shadow hover:shadow-lg hover:scale-[1.02] 
                     transition-all text-gray-800 dark:text-gray-100"
        >
          <img
            src={ex.gifUrl}
            alt={ex.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://cdn-icons-png.flaticon.com/512/2964/2964514.png";
            }}
            className="rounded-lg w-full h-48 object-contain bg-gray-50 dark:bg-gray-900 mb-3"
          />
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 capitalize">
            {ex.name}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Músculo:</strong> {ex.target}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Equipo:</strong> {ex.equipment}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Zona:</strong> {ex.bodyPart}
          </p>
        </div>
      ))}
    </div>
  );
}
