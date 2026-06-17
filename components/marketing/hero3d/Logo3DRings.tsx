"use client";

import type { MutableRefObject } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Group } from "three";
import type { Logo3DPointerState } from "./useLogo3DPointer";

type Logo3DRingsProps = {
  pointerState: MutableRefObject<Logo3DPointerState>;
};

export function Logo3DRings({ pointerState }: Logo3DRingsProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const pointer = pointerState.current;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.055 + pointer.x * 0.16;
    groupRef.current.rotation.x = pointer.y * -0.055;
    groupRef.current.rotation.y = pointer.x * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.5]}>
      <mesh scale={[2.35, 2.35, 2.35]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#e01818"
          transparent
          opacity={0.055}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.12, 0.22, -0.34]} scale={[1.62, 1.62, 1.62]}>
        <torusGeometry args={[1, 0.011, 12, 190, Math.PI * 1.52]} />
        <meshBasicMaterial
          color="#ff5a00"
          transparent
          opacity={0.78}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[-0.08, -0.38, 0.28]} scale={[1.94, 1.94, 1.94]}>
        <torusGeometry args={[1, 0.006, 8, 190, Math.PI * 1.18]} />
        <meshBasicMaterial
          color="#e01818"
          transparent
          opacity={0.42}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.2, 0.12, 0.64]} scale={[1.22, 1.22, 1.22]}>
        <torusGeometry args={[1, 0.004, 8, 170, Math.PI * 0.82]} />
        <meshBasicMaterial
          color="#ff9b2a"
          transparent
          opacity={0.34}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
