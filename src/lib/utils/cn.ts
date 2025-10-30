// src/lib/utils/cn.ts
import { type ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases de forma segura y elimina conflictos de Tailwind.
 * Ej: cn("px-2 py-2", condition && "bg-red-500", "px-4") -> "py-2 bg-red-500 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
