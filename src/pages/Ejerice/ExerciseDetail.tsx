import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExercises } from "@/lib/exercise/fetchExercises";

export default function ExerciseDetail() {
  const { name } = useParams();
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchExercises(); // obtiene todos los ejercicios
        const found = data.find(
          (ex: any) => ex.name.toLowerCase() === name?.toLowerCase()
        );
        if (found) setExercise(found);
        else setError("Ejercicio no encontrado");
      } catch (err) {
        setError("Error al obtener los detalles del ejercicio");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        Cargando ejercicio...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-600 dark:text-green-400">
          {exercise.name}
        </h1>

        {/* Imagen relacionada */}
        <img
          src={`https://source.unsplash.com/800x400/?${encodeURIComponent(
            exercise.name + " workout"
          )}`}
          alt={exercise.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://cdn-icons-png.flaticon.com/512/2964/2964514.png";
          }}
          className="w-full rounded-xl mb-8 object-cover shadow-lg"
        />

        {/* Información general */}
        <div className="space-y-3 mb-8">
          <p>
            <strong>Músculo:</strong> {exercise.muscle}
          </p>
          <p>
            <strong>Dificultad:</strong> {exercise.difficulty}
          </p>
          <p>
            <strong>Tipo:</strong> {exercise.type}
          </p>
          <p>
            <strong>Equipo:</strong> {exercise.equipment || "Ninguno"}
          </p>
        </div>

        {/* Instrucciones */}
        <div className="bg-gray-50 dark:bg-[#1b1b1b] p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500 dark:text-indigo-300">
            Cómo realizar este ejercicio
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {exercise.instructions}
          </p>
        </div>

        {/* Recomendación personalizada */}
        <div className="mt-6 p-5 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">
            💪 Recomendación de entrenamiento
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Realiza <strong>3-4 series</strong> de <strong>10-15 repeticiones</strong>.  
            Descansa entre <strong>45 a 60 segundos</strong> entre series.  
            Ajusta el peso o la intensidad según tu nivel.
          </p>
        </div>
      </div>
    </div>
  );
}
