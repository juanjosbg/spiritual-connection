"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import ProfileSettingsDrawer from "@/components/Profile/ProfileSettingsDrawer";

interface SidebarProfileProps {
  user: any;
  subCategories?: { name: string; href: string }[];
  className?: string;
  children?: React.ReactNode;
}

export default function SidebarProfile({
  user,
  subCategories = [],
  className = "",
}: SidebarProfileProps) {
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const classNames = (...classes: string[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <aside className={classNames(
        "hidden md:flex w-[38vh] flex-col border-r border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-4 px-6 py-6 border-b border-gray-100 dark:border-gray-700 relative">
        <Card className="border-none shadow-none bg-transparent">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="p-0.5 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500">
                <img
                  src={user?.user_metadata?.avatar_url || "/avatars/avatar1.png"}
                  alt="avatar"
                  className="block w-20 h-20 rounded-full object-cover bg-gray-100 p-1 ring-2 ring-indigo-500 ring-offset-2 ring-offset-transparent"
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
          setUser={() => {}}
        />
      </div>

      {/* Menu lateral */}
      <nav className="flex-1 px-4 py-6 border-t border-gray-100">
        <ul className="space-y-2">
          {subCategories.map((item) => (
            <li
              key={item.name}
              className={classNames(
                "flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              )}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
