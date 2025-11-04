const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export interface RelaxTrack {
  id: number;
  title: string;
  artist: string;
  url: string;
  audio: string;
  duration: number; // segundos
  image: string;
}

/**
 * Busca música relajante o binaural según el tema.
 * @param query 
 */

export async function fetchRelaxMusic(query: string = "meditation ambient nature") {
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10`, {
      headers: {
        Authorization: API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Error al obtener música de Pexels");

    const data = await res.json();

    const tracks: RelaxTrack[] = data.photos.map((photo: any) => ({
      id: photo.id,
      title: query.split(" ")[0].toUpperCase() + " Session",
      artist: "Pexels Audio",
      url: photo.url,
      audio: photo.src.original,
      duration: Math.floor(Math.random() * 240 + 120),
      image: photo.src.medium,
    }));

    return tracks;
  } catch (err) {
    console.error("❌ Error al cargar música relajante:", err);
    return [];
  }
}
