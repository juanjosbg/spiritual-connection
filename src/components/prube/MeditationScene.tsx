"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";

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
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Luz ambiental muy tenue */}
        <ambientLight intensity={0.3} />

        {/* Fondo con estrellas */}
        <Stars
          radius={60}
          depth={50}
          count={4000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Nube de partículas */}
        <FloatingParticles />

        {/* Control orbital (desactiva zoom/pan) */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
