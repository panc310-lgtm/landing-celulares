"use client";

import type { MutableRefObject, ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import {
  advanceImmersivePointerInertia,
  type ImmersivePointerState,
} from "./useImmersivePointer";

type MarketingLogoRigProps = {
  children: ReactNode;
  pointerState: MutableRefObject<ImmersivePointerState>;
};

export function MarketingLogoRig({ children, pointerState }: MarketingLogoRigProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const pointer = pointerState.current;
    const elapsed = state.clock.elapsedTime;

    advanceImmersivePointerInertia(pointer);

    const idleX = pointer.isHoveringStage ? 0 : Math.sin(elapsed * 0.26) * 0.035;
    const idleY = pointer.isHoveringStage ? 0 : Math.sin(elapsed * 0.22) * 0.075;
    const targetX = pointer.hoverRotationX + pointer.dragRotationX + idleX;
    const targetY = pointer.hoverRotationY + pointer.dragRotationY + idleY;
    const targetZ = pointer.normalizedX * -0.035;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.085;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.085;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.075;
    groupRef.current.position.x +=
      (pointer.normalizedX * 0.08 - groupRef.current.position.x) * 0.055;
    groupRef.current.position.y =
      Math.sin(elapsed * 0.68) * 0.035 + pointer.normalizedY * 0.035;
  });

  return <group ref={groupRef}>{children}</group>;
}
