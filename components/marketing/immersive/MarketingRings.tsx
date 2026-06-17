"use client";

import type { MutableRefObject } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Group } from "three";
import type { ImmersivePointerState } from "./useImmersivePointer";

type MarketingRingsProps = {
  pointerState: MutableRefObject<ImmersivePointerState>;
};

export function MarketingRings({ pointerState }: MarketingRingsProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const pointer = pointerState.current;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.048 + pointer.normalizedX * 0.12;
    groupRef.current.rotation.x = pointer.normalizedY * -0.045;
    groupRef.current.rotation.y = pointer.normalizedX * 0.07;
    groupRef.current.position.x = pointer.normalizedX * -0.08;
    groupRef.current.position.y = pointer.normalizedY * -0.035;
  });

  return (
    <group ref={groupRef} position={[0, 0.02, -0.62]}>
      <mesh scale={[2.1, 2.1, 2.1]}>
        <torusGeometry args={[1, 0.009, 12, 220]} />
        <meshBasicMaterial
          color="#e01818"
          transparent
          opacity={0.3}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.1, 0.18, -0.42]} scale={[1.65, 1.65, 1.65]}>
        <torusGeometry args={[1, 0.006, 8, 170, Math.PI * 1.34]} />
        <meshBasicMaterial
          color="#ff4a12"
          transparent
          opacity={0.58}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[-0.08, -0.28, 0.32]} scale={[2.55, 2.55, 2.55]}>
        <torusGeometry args={[1, 0.004, 8, 190, Math.PI * 1.08]} />
        <meshBasicMaterial
          color="#ff9b2a"
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.2, 0.12, 0.64]} scale={[1.22, 1.22, 1.22]}>
        <torusGeometry args={[1, 0.0035, 8, 150, Math.PI * 0.72]} />
        <meshBasicMaterial
          color="#d8d8d8"
          transparent
          opacity={0.14}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={[2.38, 2.38, 2.38]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#690000"
          transparent
          opacity={0.035}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
