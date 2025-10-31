export type Pose = {
  id: number;
  english_name: string;
  sanskrit_name?: string;
  translation_name?: string;
  pose_description?: string;
  pose_benefits?: string;
  url_svg?: string;
  url_png?: string;
  difficulty_level?: string;
};

const BASE_URL = "https://yoga-api-nzy4.onrender.com/v1";

export async function fetchAllPoses(): Promise<Pose[]> {
  const res = await fetch(`${BASE_URL}/poses`);
  if (!res.ok) {
    throw new Error("Error fetching poses");
  }
  const data: Pose[] = await res.json();
  return data;
}

export async function fetchPoseByName(name: string): Promise<Pose | null> {
  const res = await fetch(`${BASE_URL}/poses?name=${encodeURIComponent(name)}`);
  if (!res.ok) {
    return null;
  }
  const data: Pose[] = await res.json();
  return data.length > 0 ? data[0] : null;
}
