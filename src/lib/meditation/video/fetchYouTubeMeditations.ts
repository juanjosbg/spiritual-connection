import axios from "axios";

export interface MeditationVideo {
  id: string;
  title: string;
  thumbnail: string;
}

export async function fetchYouTubeMeditations(query = "relaxing meditation") {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=${key}`;

  const { data } = await axios.get(url);
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}
