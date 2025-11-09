import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/lib/database/favoritesService";

export function useFavorites(userId?: string) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const checkFavorite = async (soundId: string) => {
    if (!userId) return false;
    return await isFavorite(userId, soundId);
  };

  const toggleFavorite = async (sound: any) => {
    if (!userId) return;
    const exists = await isFavorite(userId, sound.id);
    if (exists) {
      await removeFavorite(userId, sound.id);
      setFavorites((prev) => prev.filter((id) => id !== sound.id));
    } else {
      await addFavorite(userId, sound);
      setFavorites((prev) => [...prev, sound.id]);
    }
  };

  const isFav = (soundId: string) => favorites.includes(soundId);

  return { toggleFavorite, isFav, checkFavorite };
}
