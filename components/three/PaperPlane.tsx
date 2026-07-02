"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function planeShapeGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.5);
  shape.lineTo(0.32, -0.4);
  shape.lineTo(0, -0.22);
  shape.lineTo(-0.32, -0.4);
  shape.lineTo(0, 0.5);
  return new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false });
}

export default function PaperPlane({
  radius = 3.6,
  center = [0.5, 0.4, -1] as [number, number, number],
  speed = 0.22,
  color = "#f9f4ef",
}: {
  radius?: number;
  center?: [number, number, number];
  speed?: number;
  color?: string;
}) {
  const ref = useRef<Group>(null);
  const tipRef = useRef<Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const angle = elapsed.current * speed;
    const x = center[0] + Math.cos(angle) * radius;
    const z = center[2] + Math.sin(angle) * radius;
    const y = center[1] + Math.sin(angle * 2.4) * 0.4;

    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y = -angle + Math.PI;
      ref.current.rotation.z = Math.sin(angle * 2.4) * 0.3;
      ref.current.rotation.x = Math.PI / 2 + 0.25;
    }
  });

  return (
    <group ref={ref}>
      <mesh geometry={planeShapeGeometry()} castShadow>
        <meshStandardMaterial color={color} flatShading roughness={0.35} metalness={0.05} emissive="#F69F83" emissiveIntensity={0.15} />
      </mesh>
      <Trail width={2.2} length={7} color="#E0C1A5" attenuation={(t) => t * t}>
        <mesh ref={tipRef} position={[0, 0.5, 0]} visible={false}>
          <sphereGeometry args={[0.02]} />
        </mesh>
      </Trail>
    </group>
  );
}
