// src/pages/Exercise/ExerciseDetailDB.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExerciseById } from "@/lib/exercise/fetchExercisesDB";

export default function ExerciseDetailDB() {
  const { id } = useParams();
  const [ex, setEx] = useState<any>(null);

  useEffect(() => {
    (async () => setEx(await fetchExerciseById(id!)))();
  }, [id]);

  if (!ex) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-600 capitalize">{ex.name}</h1>
      <img src={ex.gifUrl} alt={ex.name} className="w-full h-96 object-contain mb-6 bg-gray-100 dark:bg-[#1b1b1b] rounded-lg" />
      <ul className="space-y-2 mb-6">
        <li><strong>Músculo objetivo:</strong> {ex.target}</li>
        <li><strong>Equipo:</strong> {ex.equipment}</li>
        <li><strong>Parte del cuerpo:</strong> {ex.bodyPart}</li>
      </ul>
      <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg">
        <h3 className="font-semibold mb-2">Sugerencia de series y repeticiones</h3>
        <p className="text-sm">3–4 series de 8–12 reps (fuerza/hipertrofia). Descansa 60–90s. Prioriza técnica y rango de movimiento controlado.</p>
      </div>
    </div>
  );
}
