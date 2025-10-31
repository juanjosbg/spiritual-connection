"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  Squares2X2Icon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { Sparkles } from "lucide-react";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

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
    <div className="flex bg-[#F6F7FB] min-h-screen text-gray-800">
      <aside className="w-64 bg-white flex flex-col border-r border-gray-200">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-100">
         <Card className="border-none shadow-none">
            <div className="flex items-start gap-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-emerald-400 p-1">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-xl font-bold text-indigo-600">
                  {user?.user_metadata?.first_name
                    ? user.user_metadata.first_name.charAt(0).toUpperCase()
                    : "?"}
                </div>
              </div>

              <div className="flex-1 text-gray-900">
                <h1 className="text-xl font-bold uppercase">
                  {user?.user_metadata?.first_name &&
                  user?.user_metadata?.last_name
                    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                    : "Usuario sin nombre"}
                </h1>
                <p className="text-gray-600 mb-3 text-sm">
                  {user?.email || "Correo no disponible"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {subCategories.map((item) => (
              <li
                key={item.name}
                className={classNames(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                )}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-6">
          <button className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg shadow-sm transition">
            Add Funds
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Electronic Arts</h1>
            <p className="text-sm text-gray-500">
              American video game company
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-white rounded-xl px-6 py-3 shadow-sm">
              <p className="text-sm text-gray-500">All Time Profit</p>
              <p className="text-xl font-semibold text-yellow-500">
                +73.36%
              </p>
            </div>

            <img
              src={
                user?.user_metadata?.avatar_url ||
                "https://i.pravatar.cc/100?img=8"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full shadow-md"
            />
          </div>
        </div>

        {/* ===== Dashboard Cards Section ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Chart Card */}
          <Card className="bg-white rounded-2xl shadow-sm col-span-2">
            <CardHeader className="flex items-center justify-between border-b border-gray-100">
              <CardTitle>Electronic Arts</CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                88.10 USD
                <span className="text-emerald-500 ml-2 font-semibold">
                  +5.23%
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <img
                src=""
                alt="chart"
                className="rounded-xl w-full"
              />
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardHeader className="flex justify-between items-center border-b border-gray-100">
              <CardTitle>Your Watchlist</CardTitle>
              <a href="#" className="text-sm text-indigo-500">
                View All
              </a>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { name: "Netflix", value: "+0.31%", color: "text-emerald-500" },
                {
                  name: "CD Projekt",
                  value: "-1.65%",
                  color: "text-red-500",
                },
                { name: "Square Enix", value: "+2.25%", color: "text-emerald-500" },
                { name: "Apple", value: "+0.53%", color: "text-emerald-500" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className={`font-semibold ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ===== Similar Companies Section ===== */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Similar Companies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Square Enix", value: "+2.25%" },
              { name: "Ubisoft", value: "+1.75%" },
              { name: "Nintendo", value: "+0.60%" },
              { name: "Microsoft", value: "+1.26%" },
            ].map((c) => (
              <div
                key={c.name}
                className="bg-white p-4 rounded-xl text-center shadow-sm"
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-emerald-500 mt-1">{c.value}</p>
                <button className="text-xs text-indigo-500 mt-2">Compare</button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Card className="bg-indigo-100 text-indigo-900 rounded-2xl shadow-none flex justify-between items-center p-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Invest in green energy
              </h3>
              <p className="text-sm mb-4">Join the sustainability movement</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                Invest now!
              </button>
            </div>
            <img
              src=""
              alt="wind"
              className="w-40"
            />
          </Card>
        </section>
      </main>
    </div>
  );
}
