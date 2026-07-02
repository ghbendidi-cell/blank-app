"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Group } from "three";
import Globe from "./Globe";
import FloatingPanel from "./FloatingPanel";

const DESTINATION_COLORS = ["#F69F83", "#6D9891", "#AFAC9B", "#76575D"];

function CameraRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.25 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-pointer.y * 0.12 - groupRef.current.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene() {
  const panelPositions: [number, number, number][] = [
    [-3.4, 1, -2.5],
    [-2.6, -1.3, -1.2],
    [3.6, -0.8, -2.8],
    [2.8, 1.6, -3.4],
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} color="#E0C1A5" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#6D9891" />

      <Suspense fallback={null}>
        <CameraRig>
          <Globe />
          {panelPositions.map((position, index) => (
            <FloatingPanel key={index} position={position} color={DESTINATION_COLORS[index]} scale={0.85} />
          ))}
          <Sparkles count={140} scale={[10, 6, 7]} size={3} speed={0.3} color="#E0C1A5" opacity={0.7} />
          <Sparkles count={40} scale={[8, 4, 6]} size={4} speed={0.15} color="#F69F83" opacity={0.5} />
        </CameraRig>
      </Suspense>
    </Canvas>
  );
}
