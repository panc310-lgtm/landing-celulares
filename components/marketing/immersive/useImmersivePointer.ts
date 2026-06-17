"use client";

import type { PointerEvent } from "react";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";

export type ImmersivePointerState = {
  mouseX: number;
  mouseY: number;
  normalizedX: number;
  normalizedY: number;
  velocity: number;
  hoverRotationX: number;
  hoverRotationY: number;
  dragRotationX: number;
  dragRotationY: number;
  dragVelocityX: number;
  dragVelocityY: number;
  isHoveringStage: boolean;
  isDraggingLogo: boolean;
  lastClientX: number;
  lastClientY: number;
};

const initialPointerState: ImmersivePointerState = {
  mouseX: 0,
  mouseY: 0,
  normalizedX: 0,
  normalizedY: 0,
  velocity: 0,
  hoverRotationX: 0,
  hoverRotationY: 0,
  dragRotationX: 0,
  dragRotationY: 0,
  dragVelocityX: 0,
  dragVelocityY: 0,
  isHoveringStage: false,
  isDraggingLogo: false,
  lastClientX: 0,
  lastClientY: 0,
};

const dragSensitivity = 0.0085;
const dragXMin = -0.55;
const dragXMax = 0.55;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function useImmersivePointer() {
  const prefersReducedMotion = useReducedMotion();
  const pointerState = useRef<ImmersivePointerState>({ ...initialPointerState });

  return useMemo(() => {
    function updateHover(event: PointerEvent<HTMLElement>) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const previousX = pointerState.current.mouseX;
      const previousY = pointerState.current.mouseY;

      pointerState.current.mouseX = event.clientX;
      pointerState.current.mouseY = event.clientY;
      pointerState.current.normalizedX = clamp(x * 2, -1, 1);
      pointerState.current.normalizedY = clamp(y * 2, -1, 1);
      pointerState.current.velocity =
        Math.hypot(event.clientX - previousX, event.clientY - previousY) * 0.01;
      pointerState.current.hoverRotationY = pointerState.current.normalizedX * 0.35;
      pointerState.current.hoverRotationX = -pointerState.current.normalizedY * 0.16;
      pointerState.current.isHoveringStage = true;
    }

    function handlePointerMove(event: PointerEvent<HTMLElement>) {
      if (prefersReducedMotion) {
        return;
      }

      updateHover(event);

      if (!pointerState.current.isDraggingLogo) {
        return;
      }

      const dx = event.clientX - pointerState.current.lastClientX;
      const dy = event.clientY - pointerState.current.lastClientY;

      pointerState.current.dragRotationY += dx * dragSensitivity;
      pointerState.current.dragRotationX = clamp(
        pointerState.current.dragRotationX + dy * dragSensitivity,
        dragXMin,
        dragXMax,
      );
      pointerState.current.dragVelocityY = dx * dragSensitivity;
      pointerState.current.dragVelocityX = dy * dragSensitivity;
      pointerState.current.lastClientX = event.clientX;
      pointerState.current.lastClientY = event.clientY;
    }

    function handlePointerDown(event: PointerEvent<HTMLElement>) {
      if (prefersReducedMotion) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      updateHover(event);
      pointerState.current.isDraggingLogo = true;
      pointerState.current.lastClientX = event.clientX;
      pointerState.current.lastClientY = event.clientY;
    }

    function handlePointerUp(event: PointerEvent<HTMLElement>) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      pointerState.current.isDraggingLogo = false;
    }

    function handlePointerLeave() {
      pointerState.current.isHoveringStage = false;
      pointerState.current.hoverRotationX = 0;
      pointerState.current.hoverRotationY = 0;
      pointerState.current.normalizedX = 0;
      pointerState.current.normalizedY = 0;
    }

    return {
      pointerState,
      handlePointerMove,
      handlePointerDown,
      handlePointerUp,
      handlePointerLeave,
    };
  }, [prefersReducedMotion]);
}

export function advanceImmersivePointerInertia(pointer: ImmersivePointerState) {
  if (!pointer.isDraggingLogo) {
    pointer.dragRotationY += pointer.dragVelocityY;
    pointer.dragRotationX = clamp(
      pointer.dragRotationX + pointer.dragVelocityX,
      dragXMin,
      dragXMax,
    );
    pointer.dragVelocityY *= 0.92;
    pointer.dragVelocityX *= 0.9;
    pointer.dragRotationY *= 0.985;
    pointer.dragRotationX *= 0.982;
  }

  pointer.velocity *= 0.88;
}
