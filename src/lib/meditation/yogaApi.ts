"use client";

export interface Pose {
  id: number;
  english_name: string;
  sanskrit_name?: string;
  translation_name?: string;
  pose_description?: string;
  pose_benefits?: string;
  url_svg?: string;
  url_png?: string;

  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  duration?: "10" | "20" | "30";
  category?: "Balance" | "Strength" | "Flexibility" | "Meditation";
}

const BASE_URL = "https://yoga-api-nzy4.onrender.com/v1";

export async function fetchAllPoses(): Promise<Pose[]> {
  try {
    const res = await fetch(`${BASE_URL}/poses`);
    if (!res.ok) throw new Error("Error fetching poses");

    const data: Pose[] = await res.json();

    const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;
    const durations = ["10", "20", "30"] as const;
    const categories = ["Balance", "Strength", "Flexibility", "Meditation"] as const;

    const enhanced: Pose[] = data.map((pose, i) => ({
      ...pose,
      difficulty: difficulties[i % difficulties.length],
      duration: durations[i % durations.length],
      category: categories[i % categories.length],
    }));

    return enhanced;
  } catch (error) {
    console.error("❌ Error al obtener las poses:", error);
    return [];
  }
}

export async function fetchPoseByName(name: string): Promise<Pose | null> {
  try {
    const res = await fetch(`${BASE_URL}/poses?name=${encodeURIComponent(name)}`);
    if (!res.ok) return null;
    const data: Pose[] = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("❌ Error al buscar pose:", err);
    return null;
  }
}
