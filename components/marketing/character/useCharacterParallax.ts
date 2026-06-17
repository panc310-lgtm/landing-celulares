"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export function useCharacterParallax() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3.5, -3.5]);
  const haloX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const haloY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(Math.max(-0.5, Math.min(0.5, x)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, y)));
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return {
    mouseX,
    mouseY,
    smoothX,
    smoothY,
    rotateX,
    rotateY,
    haloX,
    haloY,
    handlePointerMove,
    handlePointerLeave,
  };
}
