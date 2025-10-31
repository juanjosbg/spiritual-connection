// src/pages/YogaPoses.tsx
import React, { useEffect, useState } from "react";
import { fetchAllPoses } from "@/lib/meditation/yogaApi";
import type { Pose } from "@/lib/meditation/yogaApi";
import { PoseCard } from "@/components/meditation/PoseCard";

export default function YogaPosesPage() {
  const [poses, setPoses] = useState<Pose[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPoses()
      .then((data) => setPoses(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Cargando poses…</div>;

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {poses.map((pose) => (
        <PoseCard key={pose.id} pose={pose} />
      ))}
    </div>
  );
}
