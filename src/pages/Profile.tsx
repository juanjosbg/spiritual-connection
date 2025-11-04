"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimilarCompaniesCarousel from "@/components/Profile/SimilarCompaniesCarousel";
import { Settings } from "lucide-react";
import ProfileSettingsDrawer from "@/components/Profile/ProfileSettingsDrawer";
import { DashBoard } from "@/components/dashboard/DashBoard";

const subCategories = [
  { name: "Dashboard", href: "#" },
  { name: "Operations", href: "#" },
  { name: "My Wallet", href: "#" },
  { name: "Stock Quotes", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUserData();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen mt-12">
        <aside className="hidden md:flex w-[38vh] flex-col border-r border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 px-6 py-6 border-b border-gray-100 dark:border-gray-700 relative">
            <Card className="border-none shadow-none bg-transparent">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="p-0.5 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500">
                    <img src={ user?.user_metadata?.avatar_url || "/avatars/avatar1.png"}
                      alt="avatar"
                      className="block w-20 h-20 rounded-full object-cover bg-gray-100 p-1
                       ring-2 ring-indigo-500 ring-offset-2 ring-offset-transparent"
                    />
                  </div>

                  <button
                    onClick={() => setSettingsOpen(true)}
                    className="absolute -bottom-1 right-1 bg-indigo-600 p-1.5 rounded-full
                     text-white hover:bg-indigo-700 transition shadow-sm"
                    title="Editar perfil"
                  >
                    <Settings size={14} />
                  </button>
                </div>

                <div className="text-left">
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {user?.user_metadata?.first_name || "Usuario sin nombre"}
                  </h1>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    {user?.email || "Correo no disponible"}
                  </p>
                </div>
              </div>
            </Card>

            <ProfileSettingsDrawer
              open={settingsOpen}
              setOpen={setSettingsOpen}
              user={user}
              setUser={setUser}
            />
          </div>

          <nav className="flex-1 px-4 py-6 border-t border-gray-100">
            <ul className="space-y-2">
              {subCategories.map((item) => (
                <li
                  key={item.name}
                  className={classNames(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-gray-400 cursor-pointer"
                  )}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

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

          {/* Electronic Arts - Your Watchlist */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-sm col-span-2 border-none">
              <DashBoard />
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/70 border-none rounded-2xl shadow-sm backdrop-blur-sm">
              <CardHeader className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Your Watchlist</CardTitle>
                <a href="#" className="text-sm text-indigo-500">
                  View All
                </a>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  {
                    name: "Netflix",
                    value: "+0.31%",
                    color: "text-emerald-500",
                  },
                  {
                    name: "CD Projekt",
                    value: "-1.65%",
                    color: "text-red-500",
                  },
                  {
                    name: "Square Enix",
                    value: "+2.25%",
                    color: "text-emerald-500",
                  },
                  { name: "Apple", value: "+0.53%", color: "text-emerald-500" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{item.name}</span>
                    <span className={`font-semibold ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Cards */}
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
