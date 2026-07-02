"use client";

import { Float, RoundedBox } from "@react-three/drei";

export default function FloatingPanel({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <group position={position} scale={scale}>
        <RoundedBox args={[1, 1.3, 0.06]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial color={color} transparent opacity={0.55} roughness={0.2} metalness={0.1} emissive={color} emissiveIntensity={0.25} />
        </RoundedBox>
      </group>
    </Float>
  );
}
