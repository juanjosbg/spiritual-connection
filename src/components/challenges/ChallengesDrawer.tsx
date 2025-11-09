"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const challenges = [
  {
    id: 1,
    name: "5 Minutos de Paz",
    description: "Realiza una sesión de meditación de al menos 5 minutos.",
    progress: "0/1 completado",
  },
  {
    id: 2,
    name: "Amanecer Zen",
    description: "Completa una rutina antes de las 8:00 AM.",
    progress: "0/1 completado",
  },
  {
    id: 3,
    name: "Viaje Interior",
    description: "Realiza 3 posturas durante el día.",
    progress: "1/3 completado",
  },
];

export default function ChallengesDrawer({ open, setOpen }: any) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 flex justify-end">
          <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition-all bg-white shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <DialogTitle className="text-lg font-semibold text-gray-800">
                🌿 Retos diarios
              </DialogTitle>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-[#49633e]">{c.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{c.description}</p>
                  <p className="text-xs text-[#699944] mt-2 font-medium">{c.progress}</p>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
