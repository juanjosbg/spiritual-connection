// src/hooks/useExerciseFilters.ts
import { useState } from "react";

export function useExerciseFilters() {
  const [filters, setFilters] = useState({
    muscle: "all",
    type: "all",
  });

  function updateFilter(key: "muscle" | "type", value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return { filters, updateFilter };
}
