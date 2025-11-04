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

          {/* Electronic Arts - Your Watchlist */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-sm col-span-2 border-none">
              <DashBoard />
            </Card>

            <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-sm border-none">
              <CardHeader className="flex flex-row justify-between items-center border-b border-gray-200 dark:border-gray-400">
                <CardTitle className="uppercase text-xl">Mis certificados</CardTitle>
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
