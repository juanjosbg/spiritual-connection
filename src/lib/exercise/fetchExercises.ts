const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

export async function fetchExercises(muscle = "chest", type = "strength") {
  const response = await fetch(`${BASE_URL}?muscle=${muscle}&type=${type}`, {
    headers: { "X-Api-Key": API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener ejercicios: ${response.statusText}`);
  }

  return response.json();
}
