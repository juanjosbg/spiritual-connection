import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/lib/database/supabaseClient"; // 👈 IMPORTANTE

type Section = "home" | "meditate" | "breathe";

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const session = useSession();
  const user = session?.user;

  const navigation = [
    { name: "Inicio", key: "home" as Section, onClick: () => navigate("/") },
    { name: "Meditar", key: "meditate" as Section, onClick: () => setActiveSection("meditate") },
    { name: "Respirar", key: "breathe" as Section, onClick: () => setActiveSection("breathe") },
  ];

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-b border-white/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div
            className="flex shrink-0 items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-light bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Spiritual Connection
            </span>
          </div>

          {/* ====== LINKS ====== */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="ml-6 flex space-x-1">
              {navigation.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={item.onClick}
                    className={classNames(
                      isActive
                        ? "bg-gray-900/5 dark:bg-white/10 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10",
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    )}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
            </button>

            <Menu as="div" className="relative ml-2">
              <MenuButton className="relative flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <img
                  alt="avatar"
                  src={user?.user_metadata?.avatar_url || "https://i.pravatar.cc/100?img=8"}
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.user_metadata?.full_name || ""}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                    {user?.email || ""}
                  </span>
                </div>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white/90 dark:bg-slate-900/90 py-1 shadow-lg ring-1 ring-black/5 backdrop-blur-md
                           transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {user ? (
                  <>
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        Perfil
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={async () => await supabase.auth.signOut()}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Log in
                    </Link>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
