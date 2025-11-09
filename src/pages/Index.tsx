"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flower2, Leaf, Dumbbell, Heart, Eye, Star, Users, Smile, } from "lucide-react";
import { fetchRelaxMusic, type RelaxTrack } from "@/lib/meditation/music/fetchRelaxMusic";

const Index = () => {
  const navigate = useNavigate();
  const [activeSection] = useState<"home" | "meditate" | "breathe">("home");
  const [, setTracks] = useState<RelaxTrack[]>([]);
  const [activeCard, setActiveCard] = useState("body");

  useEffect(() => {
    if (activeSection === "home") {
      fetchRelaxMusic("ambient meditation").then(setTracks);
    }
  }, [activeSection]);

  return (
    <div className="relative min-h-screen overflow-hidden py-8">
      {activeSection === "home" && (
        <section className="relative flex flex-col lg:flex-row items-center justify-between w-full px-6 md:px-16 py-20 bg-white rounded-3xl shadow-xl mx-auto mt-10 max-w-7xl overflow-hidden">
          <div className="relative inset-0 lg:static lg:w-1/2">
            <img
              src="https://www.revistayogaspirit.es/wp-content/uploads/2023/05/GettyImages-1272476948_bjk.jpg"
              alt="Mindful meditation"
              className="object-cover w-full h-full rounded-3xl brightness-95"
            />
          </div>

          {/* 🌸 Contenido textual */}
          <div className="relative lg:w-1/2 lg:ml-auto p-6 md:p-12 space-y-6 bg-white/80 backdrop-blur-md rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
              Mindful Space <br />
              That Revives <span className="font-semibold text-[#88b863]">Soul</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              We cultivate mindful practices that align body, mind, and spirit in a sanctuary
              of beauty and balance.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full shadow-sm">
                <Users className="text-indigo-500 w-5 h-5" />
                <span className="text-gray-800 text-sm font-medium">2300+ Members Worldwide</span>
              </div>

              <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full shadow-sm">
                <Smile className="text-green-600 w-5 h-5" />
                <span className="text-green-700 text-sm font-medium">
                  96% Happy Guests Report Deep Inner Calm
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/meditation")}
              className="mt-6 bg-[#88b863] hover:bg-[#699944] text-white px-6 py-3 rounded-full font-medium transition-all shadow-md"
            >
              Start Your Journey
            </button>
          </div>
        </section>
      )}

      <section className="mt-20 w-full flex flex-col items-center justify-center text-white rounded-3xl overflow-hidden">
        <div className="w-full bg-[#88b863] text-center py-16 px-6">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            The Six Human Dimensions
          </h2>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-6">
            All of our classes and programs are built and designed to exercise and
            strengthen these 6 Human Dimensions. We invite you to explore them here, and within.
          </p>
          <button className="bg-white text-purple-700 px-6 py-2 rounded-full font-medium shadow hover:bg-purple-100 transition">
            Try For Free
          </button>
        </div>

        <div className="w-full flex justify-center items-center py-10 px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full px-6">
            {[
              { id: "meditation", title: "Meditation", icon: <Flower2 className="w-8 h-8" />, link: "/meditation" },
              { id: "nutrition", title: "Nutrition", icon: <Leaf className="w-8 h-8" /> },
              { id: "exercise", title: "Exercise", icon: <Dumbbell className="w-8 h-8" /> },
              { id: "spirituality", title: "Spirituality", icon: <Heart className="w-8 h-8" /> },
              { id: "awareness", title: "Awareness", icon: <Eye className="w-8 h-8" /> },
              { id: "soul", title: "Soul", icon: <Star className="w-8 h-8" /> },
            ].map((item) => {
              const isActive = activeCard === item.id;
              const base = "h-60 w-72 shadow hover:shadow-2xl flex flex-col items-center justify-center rounded-xl py-6 transition-all duration-300";
              const active = "bg-[#7caf55] text-white";
              const idle = "bg-[#7caf55] text-gray-200 hover:bg-[#b2bca9]";

              const handleClick = () => {
                if (item.link) {
                  navigate(item.link);
                } else {
                  setActiveCard(item.id);
                }
              };

              return (
                <button
                  key={item.id}
                  onClick={handleClick}
                  className={`${base} ${isActive ? active : idle}`}
                  aria-label={item.title}
                >
                  <div className="mb-2">{item.icon}</div>
                  <span className="font-light">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
