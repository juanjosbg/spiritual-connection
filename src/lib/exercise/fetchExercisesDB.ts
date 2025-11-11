// src/lib/exercise/fetchExercisesDB.ts
import { FALLBACK_EXERCISES } from "./exerciseFallbackData";
import type { Exercise } from "@/types";

const API_BASE =
  import.meta.env.VITE_EXERCISEDB_BASE || "https://exercisedb.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_EXERCISEDB_API_KEY!;
const API_HOST =
  import.meta.env.VITE_EXERCISEDB_HOST || "exercisedb.p.rapidapi.com";

function headers() {
  return {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST,
    accept: "application/json",
  };
}

/**
 * ✅ Obtiene todos los ejercicios o usa fallback local
 */
export async function getAllExercises(): Promise<Exercise[]> {
  try {
    const url = `${API_BASE}/exercises`;
    console.log("📡 Fetching todos los ejercicios desde:", url);

    const res = await fetch(url, { headers: headers() });
    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType?.includes("application/json")) {
      throw new Error(`Respuesta inválida (${res.status})`);
    }

    const data: Exercise[] = await res.json();
    console.log("✅ Total ejercicios cargados:", data.length);

    if (!data || data.length < 50) {
      console.warn("⚠️ API devolvió pocos ejercicios. Usando fallback local.");
      return FALLBACK_EXERCISES;
    }

    return data.filter((ex) => ex.name && ex.gifUrl);
  } catch (err) {
    console.error("❌ Error en getAllExercises:", err);
    console.warn("🪄 Cargando fallback local...");
    return FALLBACK_EXERCISES;
  }
}

/**
 * ✅ Obtiene ejercicios filtrados por bodyPart
 */
export async function fetchExercisesDB(muscle?: string): Promise<Exercise[]> {
  try {
    if (!muscle || muscle === "all") return getAllExercises();

    const url = `${API_BASE}/exercises/bodyPart/${encodeURIComponent(muscle)}`;
    console.log("📡 Fetching bodyPart:", url);

    const res = await fetch(url, { headers: headers() });
    const data: Exercise[] = await res.json();

    if (!data?.length) throw new Error("Sin resultados desde API");

    console.log(`✅ Ejercicios cargados para ${muscle}:`, data.length);
    return data.filter((ex) => ex.name && ex.gifUrl);
  } catch (err) {
    console.error("❌ Error en fetchExercisesDB:", err);
    console.warn("🪄 Fallback filtrado localmente.");
    return FALLBACK_EXERCISES.filter((ex) =>
      muscle ? ex.bodyPart.toLowerCase().includes(muscle.toLowerCase()) : true
    );
  }
}

/**
 * ✅ Detalle de un ejercicio por ID
 */
export async function fetchExerciseById(id: string): Promise<Exercise | null> {
  try {
    const url = `${API_BASE}/exercises/exercise/${id}`;
    console.log("📡 Fetching detalle:", url);
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) throw new Error(`ExerciseDB error (${res.status})`);
    return res.json();
  } catch (err) {
    console.error("❌ Error fetchExerciseById:", err);
    return FALLBACK_EXERCISES.find((ex) => ex.id === id) || null;
  }
}
