import { useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    "home" | "meditate" | "breathe"
  >("home");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            fullName,
            phone,
            birthDate,
          },
        },
      });

      if (error) throw error;
      if (data.user) navigate("/profile");

      setMessage("✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setBirthDate("");
      setPhone("");
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
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Crea tu cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Regístrate para acceder a la plataforma
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                  placeholder="Juan"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Número de celular
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                placeholder="+57 300 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-white/10 bg-transparent px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#30b167] focus:outline-none"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#30b167] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#4dba78] transition-colors focus-visible:outline-2 focus-visible:outline-[#30b167]"
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>

            <div className="flex items-center justify-center text-sm text-gray-400">
              <div className="h-px w-20 bg-gray-300 dark:bg-gray-600 mr-3" />
              o
              <div className="h-px w-20 bg-gray-300 dark:bg-gray-600 ml-3" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <FcGoogle className="text-xl" />
              Registrarse con Google
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#30b167] hover:text-[#4dba78]"
              >
                Iniciar sesión
              </Link>
            </p>

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
