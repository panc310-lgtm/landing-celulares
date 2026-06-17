"use client";

import type { MutableRefObject, ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { logo3DInteractionConfig } from "./hero3d-assets";
import {
  advanceLogo3DPointerInertia,
  type Logo3DPointerState,
} from "./useLogo3DPointer";

type Logo3DInteractionRigProps = {
  pointerState: MutableRefObject<Logo3DPointerState>;
  children: ReactNode;
};

export function Logo3DInteractionRig({
  pointerState,
  children,
}: Logo3DInteractionRigProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const pointer = pointerState.current;
    const elapsed = state.clock.elapsedTime;

    advanceLogo3DPointerInertia(pointer);

    const idleY = pointer.isInside ? 0 : Math.sin(elapsed * 0.28) * 0.08;
    const idleX = pointer.isInside ? 0 : Math.sin(elapsed * 0.22) * 0.035;
    const targetY = -0.55 + pointer.dragY + pointer.hoverY + idleY;
    const targetX = 0.08 + pointer.dragX + pointer.hoverX + idleX;
    const targetZ = pointer.x * -0.035;

    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * logo3DInteractionConfig.easing;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * logo3DInteractionConfig.easing;
    groupRef.current.rotation.z +=
      (targetZ - groupRef.current.rotation.z) * logo3DInteractionConfig.easing;
    groupRef.current.position.x += (pointer.x * 0.1 - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y =
      -0.15 + Math.sin(elapsed * 0.72) * 0.035 + pointer.y * 0.045;
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} scale={1.54}>
      {children}
    </group>
  );
}
