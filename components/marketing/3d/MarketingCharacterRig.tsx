"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";

type MarketingCharacterRigProps = {
  children: ReactNode;
};

export function MarketingCharacterRig({ children }: MarketingCharacterRigProps) {
  const groupRef = useRef<Group>(null);

  useFrame(({ pointer, clock }, delta) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const targetRotationY = pointer.x * 0.12 + Math.sin(elapsed * 0.38) * 0.012;
    const targetRotationX = pointer.y * -0.05 + Math.sin(elapsed * 0.44) * 0.006;

    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetRotationY, 4.8, delta);
    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetRotationX, 4.4, delta);
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      Math.sin(elapsed * 0.78) * 0.012,
      4.2,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
