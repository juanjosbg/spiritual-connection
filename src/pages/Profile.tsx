"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimilarCompaniesCarousel from "@/components/Profile/SimilarCompaniesCarousel";
import { DashBoard } from "@/components/dashboard/DashBoard";
import SidebarProfile from "@/components/layout/SidebarProfile";

const subCategories = [
  { name: "Dashboard", href: "#" },
  { name: "Operations", href: "#" },
  { name: "My Wallet", href: "#" },
  { name: "Stock Quotes", href: "#" },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [level, setLevel] = useState<string>("Beginner");
  const [xp, setXp] = useState<number>(5);
  const [progress, setProgress] = useState<number>(0); 

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("user_levels")
          .select("level, xp")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setLevel(data.level || "Beginner");
          setXp(data.xp || 0);
        }
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    setProgress(Math.min((xp / 100) * 100, 100));
  }, [xp]);

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen mt-12">
        <SidebarProfile user={user} subCategories={subCategories} />

        <main className="flex-1 pt-20 p-6 md:p-10 transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 uppercase mb-1">
                Profile
              </h1>
              <p className="text-sm text-gray-800 dark:text-gray-600">
                American video game company
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-white/80 dark:bg-gray-800/60 rounded-xl px-6 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-xl text-gray-500 dark:text-gray-200">
                  All Time Profit
                </p>
                <p className="text-xl font-semibold text-yellow-500">+73.36%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-sm col-span-2 border-none">
              <DashBoard />
            </Card>

            <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-sm border-none">
              <CardHeader className="flex flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gray-600" />
                  <CardTitle className="uppercase text-lg">
                    Mi progreso
                  </CardTitle>
                </div>
                <span className="text-xs text-gray-700 font-medium">
                  Nivel actual: {level}
                </span>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-900 mb-2">
                    Experiencia acumulada
                  </p>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                    <div
                      className="h-2 bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <p className="text-xs mt-2 text-gray-900 font-medium">
                    {xp}/100 XP {progress === 100 && "🎉 Nivel completado"}
                  </p>
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <div>
                    <p className="font-medium text-indigo-400">
                      Siguiente nivel
                    </p>
                    <p className="text-xs text-gray-900 font-medium">100 XP</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-indigo-500">Recompensa</p>
                    <p className="text-xs text-gray-900 font-medium">🏅 Medalla “Mindful Explorer”</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carrusel inferior */}
          <section className="mt-10">
            <SimilarCompaniesCarousel
              items={[
                { name: "Square Enix", value: "+2.25%" },
                { name: "Ubisoft", value: "+1.75%" },
                { name: "Nintendo", value: "+0.60%" },
                { name: "Microsoft", value: "+1.26%" },
                { name: "Sony", value: "+0.91%" },
                { name: "EA", value: "-0.34%" },
                { name: "Take-Two", value: "+0.73%" },
              ]}
            />
          </section>

          {/* Sección final */}
          <section className="mt-10">
            <Card className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 rounded-2xl shadow-none flex justify-between items-center p-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Invest in green energy
                </h3>
                <p className="text-sm mb-4">Join the sustainability movement</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                  Invest now!
                </button>
              </div>
              <Sparkles className="w-20 h-20 text-indigo-400 opacity-80" />
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
