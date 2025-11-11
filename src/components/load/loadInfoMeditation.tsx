import { motion } from "framer-motion";

export default function LoadInfoMeditation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4eae0] animate-fade-in">
      <motion.img
        src="/public/meditation-load.jpg"
        alt="Meditación cargando"
        className="w-90 h-auto mb-2 animate-float"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.p
        className="text-gray-700 text-lg font-medium tracking-wide"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Cargando contenido...
      </motion.p>
    </div>
  );
}
