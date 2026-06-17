"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";

type MarketingOrbitRigProps = {
  children: ReactNode;
};

export function MarketingOrbitRig({ children }: MarketingOrbitRigProps) {
  const groupRef = useRef<Group>(null);

  useFrame(({ pointer, clock }, delta) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const targetY = -0.26 + pointer.x * 0.16 + Math.sin(elapsed * 0.4) * 0.018;
    const targetX = pointer.y * -0.055 + Math.sin(elapsed * 0.35) * 0.012;

    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetY, 4.6, delta);
    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetX, 4.2, delta);
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      Math.sin(elapsed * 0.82) * 0.018,
      4.2,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
