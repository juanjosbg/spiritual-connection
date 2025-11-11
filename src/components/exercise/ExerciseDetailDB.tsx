// src/pages/exercise/ExerciseDetailDB.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExerciseById } from "@/lib/exercise/fetchExercisesDB";

export default function ExerciseDetailDB() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercise = async () => {
      setLoading(true);
      try {
        const data = await fetchExerciseById(id!);
        setExercise(data);
      } catch (err) {
        console.error("❌ Error cargando detalle del ejercicio:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400 dark:text-gray-300">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>Cargando ejercicio...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400 dark:text-gray-300">
        <p>⚠️ No se encontró información de este ejercicio.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-gray-800 dark:text-gray-100">
      {/* 🏋️‍♂️ Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-600 capitalize">{exercise.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Volver
        </button>
      </div>

      {/* 🖼️ Imagen */}
      <div className="flex justify-center mb-8">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://cdn-icons-png.flaticon.com/512/2964/2964514.png";
          }}
          className="w-full max-w-lg h-auto rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md"
        />
      </div>

      {/* 📋 Información general */}
      <div className="bg-gray-100 dark:bg-[#1b1b1b] rounded-lg p-6 mb-8 shadow-md">
        <ul className="space-y-3">
          <li>
            <strong>Músculo objetivo:</strong> {exercise.target}
          </li>
          <li>
            <strong>Parte del cuerpo:</strong> {exercise.bodyPart}
          </li>
          <li>
            <strong>Equipo necesario:</strong> {exercise.equipment}
          </li>
          <li>
            <strong>ID del ejercicio:</strong> {exercise.id}
          </li>
        </ul>
      </div>

      {/* 💪 Sugerencia */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-400/20">
        <h2 className="text-lg font-semibold mb-2">Sugerencia de entrenamiento</h2>
        <p className="text-sm leading-relaxed">
          Realiza <strong>3–4 series</strong> de <strong>10–12 repeticiones</strong>.  
          Descansa entre <strong>45 y 90 segundos</strong> según tu nivel.  
          Mantén la técnica correcta y respira profundamente en cada repetición.
        </p>
      </div>
    </div>
  );
}
