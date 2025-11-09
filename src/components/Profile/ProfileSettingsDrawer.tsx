"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";
import { supabase } from "@/lib/database/supabaseClient";
import AvatarSelector from "@/components/Profile/AvatarSelector";
import { toast } from "sonner";

interface ProfileSettingsDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProfileSettingsDrawer({
  open,
  setOpen,
  user,
  setUser,
}: ProfileSettingsDrawerProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🟢 Cargar datos reales desde Supabase (auth + tabla users)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.id) return;

        // 1️⃣ Trae los datos desde auth (metadata)
        const meta = user.user_metadata || {};
        setAvatarUrl(meta.avatar_url || "");

        // 2️⃣ Trae los datos desde la tabla users
        const { data, error } = await supabase
          .from("users")
          .select("first_name, last_name, phone, birth_date, email")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        // 3️⃣ Actualiza el estado local con la data real
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setPhone(data.phone || "");
        setBirthDate(data.birth_date || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("Error al cargar datos del perfil:", err);
      }
    };

    if (open) fetchUserData();
  }, [open, user]);

  // 🧠 Guardar cambios y sincronizar tanto auth como tabla users
  const handleSave = async () => {
    try {
      setSaving(true);

      // 1️⃣ Actualizar metadata en Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          birth_date: birthDate,
          avatar_url: avatarUrl,
        },
      });

      if (authError) throw authError;

      // 2️⃣ Actualizar fila en tabla users
      const { error: dbError } = await supabase
        .from("users")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone,
          birth_date: birthDate,
          avatar_url: avatarUrl,
          email,
          name: `${firstName} ${lastName}`,
        })
        .eq("id", user.id);

      if (dbError) throw dbError;

      // 3️⃣ Actualizar en el estado local
      setUser((prev: any) => ({
        ...prev,
        email,
        user_metadata: {
          ...prev.user_metadata,
          first_name: firstName,
          last_name: lastName,
          phone,
          birth_date: birthDate,
          avatar_url: avatarUrl,
        },
      }));

      toast.success("✅ Perfil actualizado correctamente");
      setEditingAvatar(false);
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error("❌ Error al actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex h-full flex-col bg-[#0b0f19] text-white shadow-xl overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                  <DialogTitle className="text-lg font-semibold">
                    Configuración de perfil
                  </DialogTitle>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Contenido */}
                <div className="flex-1 px-6 py-8 space-y-8">
                  {/* --- Avatar e información principal --- */}
                  <div className="flex items-center gap-5">
                    <div className="relative group">
                      <div className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
                        <img
                          src={avatarUrl || "/avatars/avatar1.png"}
                          alt="avatar"
                          className="w-24 h-24 rounded-full object-cover border-2 border-black"
                        />
                      </div>

                      {/* Botón editar avatar */}
                      <button
                        onClick={() => setEditingAvatar(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition"
                        title="Cambiar foto de perfil"
                      >
                        <Pencil className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">
                        {firstName} {lastName}
                      </h2>
                      <p className="text-gray-400 text-sm">{email}</p>
                    </div>
                  </div>

                  {editingAvatar && (
                    <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700 transition-all duration-300">
                      <h3 className="text-sm font-medium text-gray-300 mb-3">
                        Cambiar foto de perfil
                      </h3>
                      <AvatarSelector
                        currentAvatar={avatarUrl}
                        onAvatarChange={(newUrl) => setAvatarUrl(newUrl)}
                      />
                      <div className="text-right mt-3">
                        <button
                          onClick={() => setEditingAvatar(false)}
                          className="text-xs text-gray-400 hover:text-gray-200"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Apellido</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+57 300 000 0000"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Fecha de nacimiento</label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-800 px-6 py-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
