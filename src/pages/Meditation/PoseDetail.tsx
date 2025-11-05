"use client";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { fetchAllPoses, type Pose } from "@/lib/meditation/yogaApi";
import { getVideoIdForPose } from "@/lib/meditation/poseVideos";
import { Clock, Dumbbell, Signal, Play, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/database/supabaseClient";
import { logMeditationSession } from "@/lib/database/logActivity";

export default function PoseDetail() {
  const { id } = useParams();
  const [pose, setPose] = useState<Pose | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState<string>("");

  const handleFinishSession = async () => {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;

    if (!user) {
      alert("⚠️ Debes iniciar sesión para guardar tu progreso.");
      return;
    }
    await logMeditationSession(user.id, Number(pose?.duration ?? 15));
    alert("✅ Tu sesión ha sido registrada con éxito!");
  };

  useEffect(() => {
    const getPose = async () => {
      const poses = await fetchAllPoses();
      const found = poses.find((p) => p.id === Number(id));
      setPose(found || null);
      setVideoId(
        found?.videoId || getVideoIdForPose(found?.english_name || "") || "v7AYKMP6rOE"
      );
      setLoading(false);
    };
    getPose();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[#88b863]">
        🧘 Cargando información...
      </div>
    );

  if (!pose)
    return (
      <div className="p-10 text-center text-gray-500">
        No se encontró la pose 🧘‍♀️
        <div>
          <Link to="/meditation" className="text-[#699944] underline">
            Volver
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen mt-16 px-5 md:px-12 py-10 ">
      {/* Volver */}
      <Link
        to="/meditation"
        className="inline-flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-full shadow hover:shadow-md transition text-gray-700"
      >
        <ArrowLeft size={16} />
        Volver a las rutinas
      </Link>

      {/* Top: imagen + video */}
      <div className="mt-6 grid lg:grid-cols-2 gap-10 items-start">
        {/* Izquierda: imagen + miniaturas */}
        <div className="flex">
          <img
            src={
              pose.url_png ||
              "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop"
            }
            alt={pose.english_name}
            className="bg-[#fff8e7] rounded-2xl shadow-md border border-[#d6e8cc] object-cover max-w-[440px] max-h-[440px]"
            loading="lazy"
          />

          <div className="flex flex-col gap-3 px-4 py-1">
            {[videoId, "v7AYKMP6rOE"].map((vid, i) => (
              <button
                key={i}
                onClick={() => setVideoId(vid)}
                className="w-24 h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#88b863] transition"
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

        {/* Derecha: video + instructores */}
        <div className="space-y-6">
          <section>
            <div className="aspect-video rounded-2xl overflow-hidden border border-[#cfe4c5] shadow-md">
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
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Nuestros instructores
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Julia Crouch", "Josh Chen", "Melissa Birnie"].map((name) => (
                <div
                  key={name}
                  className="bg-white border border-[#d6e8cc] px-3 py-2 rounded-full text-sm text-gray-700 shadow-sm hover:shadow transition inline-flex items-center gap-2"
                >
                  <span className="h-7 w-7 rounded-full bg-[#88b863] text-white flex items-center justify-center text-xs font-bold">
                    {name.charAt(0)}
                  </span>
                  {name}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Info inferior */}
      <section className="mt-10 grid lg:grid-cols-2 gap-10">
        {/* Texto + botones */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] px-3 py-1 bg-[#d9edcf] text-[#4e6b43] rounded-full w-fit uppercase tracking-widest">
              Challenge
            </span>
            <h1 className="text-4xl font-extrabold text-[#2b3d23]">{pose.english_name}</h1>
            {pose.sanskrit_name && (
              <p className="italic text-[#6f8a66]">({pose.sanskrit_name})</p>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#2b3d23]">
              Lo que experimentarás 🌿
            </h3>
            <p className="text-sm text-[#4b5e45] leading-relaxed">
              Esta práctica te ayudará a fortalecer el núcleo, mejorar la
              concentración y equilibrar tu respiración. Diseñada para reconectar con tu
              cuerpo y liberar tensiones.
            </p>
            <p className="text-sm text-[#4b5e45] leading-relaxed">
              {pose.pose_benefits ||
                "Fortalece tu cuerpo y calma tu mente. Ideal para mejorar equilibrio, flexibilidad y respiración."}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#88b863] hover:bg-[#699944] text-white px-6 py-3 rounded-full w-full sm:w-auto transition shadow-sm"
            >
              Iniciar práctica
            </a>
            <button
              onClick={handleFinishSession}
              className="bg-white border border-[#cfe4c5] text-[#49633e] px-6 py-3 rounded-full w-full sm:w-auto transition hover:bg-[#f6fbf2] shadow-sm"
            >
              Guardar rutina 🧘‍♀️
            </button>
          </div>
        </div>

        {/* Tarjetas detalle */}
        <div className="grid grid-cols-2 gap-6">
          <DetailCard
            icon={<Clock size={18} />}
            label="Duración"
            value={`${pose.duration || "10"} min`}
          />
          <DetailCard
            icon={<Signal size={18} />}
            label="Dificultad"
            value={pose.difficulty || "Beginner"}
          />
          <DetailCard
            icon={<Dumbbell size={18} />}
            label="Categoría"
            value={pose.category || "Flexibilidad"}
          />
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
    <div className="bg-white border border-[#cfe4c5] p-5 rounded-xl text-sm flex flex-col gap-2 transition">
      <div className="flex items-center gap-2 text-[#699944] uppercase font-medium">
        {icon}
        <span className="text-4md text-[#49633e]">{label}</span>
      </div>
      <p className="text-sm text-[#4b5e45] leading-relaxed">{value}</p>
    </div>
  );
}
