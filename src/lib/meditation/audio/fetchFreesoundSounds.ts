// lib/meditation/audio/fetchFreesound.ts
import axios from "axios";

export interface RelaxingSound {
  id: number;
  name: string;
  url: string;
  duration: number;
  username: string;
  license?: string;
}

export async function fetchFreesoundSounds(query = "relaxing nature"): Promise<RelaxingSound[]> {
  const apiKey = import.meta.env.VITE_FREESOUND_API_KEY;
  const url = `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(
    query
  )}&fields=id,name,previews,duration,username,license&filter=duration:[30 TO 600]&page_size=12&token=${apiKey}`;

  const { data } = await axios.get(url);
  return (data.results || [])
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      url: item.previews?.["preview-hq-mp3"] ?? item.previews?.["preview-lq-mp3"],
      duration: item.duration,
      username: item.username,
      license: item.license,
    }))
    .filter((s: RelaxingSound) => !!s.url);
}
