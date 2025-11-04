// src/pages/meditation/PoseDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { fetchAllPoses, type Pose } from "@/lib/meditation/yogaApi";
import { getVideoIdForPose } from "@/lib/meditation/poseVideos";
import { Clock, Dumbbell, Signal, Play } from "lucide-react";

export default function PoseDetail() {
  const { id } = useParams();
  const [pose, setPose] = useState<Pose | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState<string>("");

  useEffect(() => {
    const getPose = async () => {
      const poses = await fetchAllPoses();
      const found = poses.find((p) => p.id === Number(id));
      setPose(found || null);
      setVideoId(found?.videoId || getVideoIdForPose(found?.english_name || "") || "v7AYKMP6rOE");
      setLoading(false);
    };
    getPose();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-indigo-300">
        🧘 Cargando información...
      </div>
    );

  if (!pose)
    return (
      <div className="p-10 text-center text-gray-400">
        No se encontró la pose 🧘‍♀️
        <div>
          <Link to="/meditation" className="text-indigo-400 underline">
            Volver
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen mt-16 text-white px-6 md:px-20 py-12">
      <Link to="/meditation" className="text-indigo-300 hover:text-indigo-400 text-sm">
        ← Volver a las rutinas
      </Link>

      <div className="mt-5 grid lg:grid-cols-2 gap-14 items-start">
        <div className="space-y-5">
          <img
            src={
              pose.url_png ||
              "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop"
            }
            alt={pose.english_name}
            className="rounded-2xl shadow-lg border border-indigo-800 object-cover w-full max-h-[480px]"
            loading="lazy"
          />

          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {[videoId, "v7AYKMP6rOE"].map((vid, i) => (
              <button
                key={i}
                onClick={() => setVideoId(vid)}
                className="w-24 h-24 rounded-xl overflow-hidden border border-indigo-700 cursor-pointer hover:opacity-80 transition"
                title="Cambiar video"
              >
                <img
                  src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`}
                  alt="miniatura"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <div className="aspect-video rounded-xl overflow-hidden border border-indigo-700 shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Tutorial ${pose.english_name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Nuestros instructores</h3>
            <div className="flex flex-wrap gap-4">
              {["Julia Crouch", "Josh Chen", "Melissa Birnie"].map((name) => (
                <div
                  key={name}
                  className="bg-indigo-800/40 p-3 rounded-lg text-sm flex items-center gap-3 border border-indigo-700/30 hover:bg-indigo-700/40 transition"
                >
                  <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
                    {name.charAt(0)}
                  </div>
                  {name}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="mt-8 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs px-3 py-1 bg-indigo-700/50 rounded-full w-fit uppercase tracking-widest font-light">
              Challenge
            </span>
            <h1 className="text-4xl font-bold">{pose.english_name}</h1>
            {pose.sanskrit_name && (
              <p className="italic text-indigo-300">({pose.sanskrit_name})</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Lo que experimentarás 🌿</h3>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Esta práctica te ayudará a fortalecer el núcleo, mejorar la
              concentración y equilibrar tu respiración. Diseñada para
              reconectar con tu cuerpo y liberar tensiones.
            </p>
            <p className="text-sm text-indigo-200 leading-relaxed">
              {pose.pose_benefits ||
                "Fortalece tu cuerpo y calma tu mente. Ideal para mejorar equilibrio, flexibilidad y respiración."}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full w-full sm:w-auto transition text-center"
            >
              Iniciar práctica
            </a>
            <button className="bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 px-6 py-3 rounded-full w-full sm:w-auto transition hover:bg-indigo-500/30">
              Guardar rutina
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <DetailCard icon={<Clock size={18} />} label="Duración" value={`${pose.duration || "10"} min`} />
          <DetailCard icon={<Signal size={18} />} label="Dificultad" value={pose.difficulty || "Beginner"} />
          <DetailCard icon={<Dumbbell size={18} />} label="Categoría" value={pose.category || "Flexibilidad"} />
          <DetailCard icon={<Play size={18} />} label="Sesión" value="13–43 min/día" />
        </div>
      </section>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-indigo-800/40 p-5 rounded-xl text-sm flex flex-col gap-2 border border-indigo-700/40 hover:bg-indigo-700/30 transition">
      <div className="flex items-center gap-2 text-indigo-400">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-semibold text-white text-base">{value}</p>
    </div>
  );
}
