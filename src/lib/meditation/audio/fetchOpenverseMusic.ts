import axios from "axios";

export interface OpenverseTrack {
  id: string;
  title: string;
  creator: string;
  audio_url: string;
  license: string;
  thumbnail?: string;
}

export async function fetchOpenverseMusic(query = "ambient meditation") {
  const url = `https://api.openverse.org/v1/audio/?q=${encodeURIComponent(
    query
  )}&license_type=cc0,cc-by&fields=id,title,creator,audio,thumbnail,license&source=jamendo,ccmixter`;

  try {
    const { data } = await axios.get(url);
    return data.results.map((item: any): OpenverseTrack => ({
      id: item.id,
      title: item.title,
      creator: item.creator,
      audio_url: item.audio,
      license: item.license,
      thumbnail: item.thumbnail,
    }));
  } catch (error) {
    console.error("❌ Error fetching Openverse music:", error);
    return [];
  }
}
