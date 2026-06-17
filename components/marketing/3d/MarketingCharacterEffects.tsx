"use client";

import { useMemo } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function seededValue(index: number) {
  const value = Math.sin(index * 19.871) * 10000;
  return value - Math.floor(value);
}

export function MarketingCharacterEffects() {
  const particles = useMemo(() => {
    const positions = new Float32Array(126);

    for (let i = 0; i < positions.length; i += 3) {
      const radius = 1.2 + seededValue(i + 1) * 1.35;
      const angle = seededValue(i + 2) * Math.PI * 2;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = -0.95 + seededValue(i + 3) * 2.95;
      positions[i + 2] = -1.25 + seededValue(i + 4) * 0.45;
    }

    return positions;
  }, []);

  return (
    <>
      <group position={[0.08, 0.26, -0.86]} rotation={[0.02, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.03, 0.013, 16, 164]} />
          <meshBasicMaterial
            color="#ff3513"
            transparent
            opacity={0.78}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={[1.17, 1.17, 1]}>
          <torusGeometry args={[1.03, 0.006, 12, 164]} />
          <meshBasicMaterial
            color="#ff7a18"
            transparent
            opacity={0.26}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={[1.32, 1.32, 1]}>
          <circleGeometry args={[1, 96]} />
          <meshBasicMaterial
            color="#e01818"
            transparent
            opacity={0.055}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ff5a00"
          size={0.022}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.24} luminanceThreshold={0.32} luminanceSmoothing={0.32} />
        <Vignette eskil={false} offset={0.22} darkness={0.42} />
      </EffectComposer>
    </>
  );
}
