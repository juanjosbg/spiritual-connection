import { useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"home" | "meditate" | "breathe">("home");

  // ✨ Iniciar sesión con email y contraseña
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      navigate("/");
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/` },
      });
      if (error) throw error;
    } catch (err: any) {
      setMessage(`❌ Error al iniciar con Google: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#dbeafe] dark:from-[#0b0f19] dark:to-[#1e293b] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 🌈 Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Inicia sesión
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Accede a tu cuenta para continuar.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                placeholder="********"
                required
              />
            </div>

            {/* Botón principal */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#30b167] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#4dba78] transition-colors focus-visible:outline-2 focus-visible:outline-[#30b167]"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>

            {/* Separador */}
            <div className="flex items-center justify-center text-sm text-gray-400">
              <div className="h-px w-20 bg-gray-300 dark:bg-gray-600 mr-3" />
              o
              <div className="h-px w-20 bg-gray-300 dark:bg-gray-600 ml-3" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <FcGoogle className="text-xl" />
              Iniciar sesión con Google
            </button>

            {/* Navegación */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#30b167] hover:text-[#4dba78]"
              >
                Crear cuenta
              </Link>
            </p>

            {/* Mensaje de error o éxito */}
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.startsWith("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
