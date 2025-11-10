import { useEffect, useState } from "react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/database/supabaseClient";
import { useTheme } from "@/hooks/useTheme";

type Section = "home" | "meditate" | "breathe";

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  user?: any;
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar({ activeSection, setActiveSection, user }: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Disclosure
      as="nav"
      className={classNames(
        "fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-300 border-b border-transparent",
        scrolled
          ? theme === "dark"
            ? "bg-[#0f172a]/90" // Fondo oscuro cuando el tema es oscuro
            : "bg-[#f4eae0]/90" // Fondo claro cuando el tema es claro
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex shrink-0 items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-semibold bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Spiritual Connection
            </span>
          </div>

          {/* Botón de tema + perfil */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <Menu as="div" className="relative">
              <MenuButton className="relative flex items-center gap-2 rounded-full focus-visible:outline-none">
                <img
                  alt="avatar"
                  src={
                    user?.user_metadata?.avatar_url ||
                    user?.avatar_url ||
                    "https://i.pravatar.cc/100?img=8"
                  }
                  className="w-8 h-8 rounded-full bg-gray-800 ring-1 ring-gray-200 dark:ring-white/10"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.user_metadata?.first_name ||
                      user?.user_metadata?.full_name ||
                      "Usuario"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                    {user?.email || ""}
                  </span>
                </div>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white/90 
                dark:bg-slate-800/90 py-1 shadow-lg ring-1 ring-black/5 backdrop-blur-md 
                data-closed:scale-95 data-closed:opacity-0"
              >
                {user ? (
                  <>
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        Perfil
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={async () => await supabase.auth.signOut()}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
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
