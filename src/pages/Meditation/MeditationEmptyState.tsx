import { Link } from "react-router-dom";

export function MeditationEmptyState() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        🔒 Necesitas iniciar sesión
      </h2>
      <p className="text-gray-600 mb-6">
        Inicia sesión o regístrate para descubrir tu nivel de meditación y acceder a tus rutinas personalizadas.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/register"
          className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition"
        >
          Registrarme
        </Link>
      </div>
    </div>
  );
}
