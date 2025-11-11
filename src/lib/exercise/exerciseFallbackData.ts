// src/lib/exercise/exerciseFallbackData.ts

import type { Exercise } from "@/types";

export const FALLBACK_EXERCISES: Exercise[] = [
  {
    id: "0001",
    name: "3/4 sit-up",
    bodyPart: "waist",
    target: "abs",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/0001.gif",
  },
  {
    id: "0002",
    name: "abdominal crunch",
    bodyPart: "waist",
    target: "abs",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/0002.gif",
  },
  {
    id: "0003",
    name: "barbell bench press",
    bodyPart: "chest",
    target: "pectorals",
    equipment: "barbell",
    gifUrl: "https://v2.exercisedb.io/image/0025.gif",
  },
  {
    id: "0004",
    name: "dumbbell curl",
    bodyPart: "upper arms",
    target: "biceps",
    equipment: "dumbbell",
    gifUrl: "https://v2.exercisedb.io/image/0315.gif",
  },
  {
    id: "0005",
    name: "push-up",
    bodyPart: "chest",
    target: "pectorals",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/0662.gif",
  },
  {
    id: "0006",
    name: "seated shoulder press",
    bodyPart: "shoulders",
    target: "delts",
    equipment: "machine",
    gifUrl: "https://v2.exercisedb.io/image/0874.gif",
  },
];
