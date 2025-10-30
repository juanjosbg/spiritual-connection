import { Fragment, useEffect, useState } from "react";
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
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Sparkles } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

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

  // Navegación superior (desktop)
  const navigation = [
    {
      name: "Inicio",
      key: "home" as Section,
      onClick: () => {
        navigate("/");
      },
    },
    {
      name: "Meditar",
      key: "meditate" as Section,
      onClick: () => setActiveSection("meditate"),
    },
    {
      name: "Respirar",
      key: "breathe" as Section,
      onClick: () => setActiveSection("breathe"),
    },
    // { name: "Registrar", key: "register" as const, onClick: () => navigate("/register") },
  ];

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md
                 border-b border-white/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-black/5 hover:text-gray-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-500">
              <span className="sr-only">Abrir menú principal</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div
              className="flex shrink-0 items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-light bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Spiritual Connection
              </span>
            </div>

            {/* Links desktop */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="ml-6 flex space-x-1">
                {navigation.map((item) => {
                  const isActive =
                    (item.key === "home" && activeSection === "home") ||
                    (item.key === "meditate" && activeSection === "meditate") ||
                    (item.key === "breathe" && activeSection === "breathe");
                  return (
                    <button
                      key={String(item.key)}
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
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={toggle}
              className="relative rounded-full p-2 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-500"
              aria-label="Cambiar tema"
              title="Cambiar tema"
            >
              {theme === "dark" ? (
                <SunIcon className="size-5" />
              ) : (
                <MoonIcon className="size-5" />
              )}
            </button>

            <button
              type="button"
              className="relative rounded-full p-2 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-500"
              aria-label="Ver notificaciones"
              title="Notificaciones"
            >
              <BellIcon aria-hidden="true" className="size-5" />
            </button>

            <Menu as="div" className="relative ml-2">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="sr-only">Abrir menú de usuario</span>
                <img
                  alt="avatar"
                  src="https://i.pravatar.cc/100?img=8"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white/90 dark:bg-slate-900/90 py-1 shadow-lg ring-1 ring-black/5 backdrop-blur-md
                           transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 data-focus:bg-black/5 dark:data-focus:bg-white/10"
                  >
                    Perfil
                  </Link>
                </MenuItem>
                <MenuItem>
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 data-focus:bg-black/5 dark:data-focus:bg-white/10"
                    >
                      Log in
                    </Link>
                  </MenuItem>
                </MenuItem>
                <MenuItem>
                  <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 data-focus:bg-black/5 dark:data-focus:bg-white/10">
                      Iniciar sesión
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menú mobile */}
      <DisclosurePanel className="sm:hidden border-t border-white/10">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive =
              (item.key === "home" && activeSection === "home") ||
              (item.key === "meditate" && activeSection === "meditate") ||
              (item.key === "breathe" && activeSection === "breathe");

            // Para "Registrar" (ruta), usamos Link para SPA
            //const isRoute = item.key === "register";

            /* if (isRoute) {
              return (
                <DisclosureButton
                  key={String(item.key)}
                  as={Link}
                  to="/register"
                  className={classNames(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    isActive ? "bg-gray-900/5 dark:bg-white/10 text-gray-900 dark:text-white"
                             : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              );
            } */

            return (
              <DisclosureButton
                key={String(item.key)}
                as="button"
                onClick={item.onClick}
                className={classNames(
                  "block w-full text-left rounded-md px-3 py-2 text-base font-medium",
                  isActive
                    ? "bg-gray-900/5 dark:bg-white/10 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
