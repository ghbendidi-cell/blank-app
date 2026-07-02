"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export default function Globe({ position = [2.2, 0.2, -1] as [number, number, number] }) {
  const groupRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
    if (wireRef.current) wireRef.current.rotation.y -= delta * 0.06;
  });

  return (
    <group position={position}>
      <mesh ref={groupRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial color="#0e7c86" flatShading roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh ref={wireRef} scale={1.03}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color="#ffe8de" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
