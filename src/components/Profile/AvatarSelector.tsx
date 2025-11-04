"use client";

import { useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { toast } from "sonner";

interface AvatarSelectorProps {
  currentAvatar?: string;
  onAvatarChange: (url: string) => void;
}

const defaultAvatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
];

export default function AvatarSelector({
  currentAvatar,
  onAvatarChange,
}: AvatarSelectorProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (error) throw error;

      const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
      onAvatarChange(url);
      toast.success("Avatar actualizado correctamente ✨");
    } catch (err: any) {
      console.error(err);
      toast.error("Error al subir el avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm text-gray-400 mb-2">Selecciona tu avatar:</h2>
      <div className="grid grid-cols-5 gap-3">
        {defaultAvatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`avatar-${i}`}
            className={`w-14 h-14 rounded-full border-2 cursor-pointer hover:scale-105 transition
              ${
                currentAvatar === src
                  ? "border-indigo-500 ring-2 ring-indigo-300"
                  : "border-transparent"
              }`}
            onClick={() => onAvatarChange(src)}
          />
        ))}
      </div>

      <div className="mt-4">
        <label className="text-xs text-gray-300 block mb-2">
          O sube tu propia imagen
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="text-sm text-gray-300"
        />
      </div>
    </div>
  );
}
