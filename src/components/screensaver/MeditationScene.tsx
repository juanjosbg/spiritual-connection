"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Flower2 } from "lucide-react";

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!);
  const particleCount = 1500;

  const positions = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    return posArray;
  }, [particleCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions}>
        <PointMaterial
          transparent
          color="#A78BFA"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function MeditationParticles3D() {
  return (
    <div className="absolute inset-0 z-10 bg-gray-950">
      <section className="fixed z-10 w-full h-full flex items-center justify-center px-6">
        <div className="text-center relative">
          <div className="inline-block animate-float">
            <Flower2 className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-wide dark:text-white uppercase">
            Tu camino hacia el equilibrio
          </h2>
          <p className="mt-3 text-gray-600 dark:text-white text-lg">
            Una experiencia para reconectar cuerpo, mente y espíritu 🌿
          </p>
        </div>
      </section>
      
      <Canvas className="absolute inset-0 opacity-40" camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />

        <Stars
          radius={60}
          depth={50}
          count={4000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        <FloatingParticles />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
