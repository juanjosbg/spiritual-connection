export function getVideoIdForPose(name: string) {
  const key = (name || "").trim().toLowerCase();

  const map: Record<string, string> = {
    "downward facing dog": "0Fx8C3S6vG0",
    "tree pose": "yN6PwDsV7kI",
    "warrior ii": "KInFz-0a5xg",
    "child's pose": "QBzJ3ZQG8L4",
    "cobra pose": "X8F5Rj4w8tQ",
    "cat cow": "qk0v3Qk4v5E",
    "mountain pose": "PcKZ2Vcm6lA",
    "triangle pose": "lHjH6z9f4o0",
    "bridge pose": "V0wz2O2iQ0o",
    "boat pose": "hU9kQjYj2lE",
    "seated forward bend": "s5k1e2yUe5I",
    "pigeon pose": "w1e7o1yZxKQ",
  };
  return map[key] ?? "";
}
