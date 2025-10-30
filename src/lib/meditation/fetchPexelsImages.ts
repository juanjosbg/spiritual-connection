import axios from "axios";

export async function fetchPexelsImages(query = "relax nature") {
  const key = import.meta.env.VITE_PEXELS_API_KEY;
  const { data } = await axios.get("https://api.pexels.com/v1/search", {
    headers: { Authorization: key },
    params: { query, per_page: 6 },
  });

  return data.photos.map((p: any) => ({
    id: p.id,
    url: p.src.medium,
    photographer: p.photographer,
  }));
}
