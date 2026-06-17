"use client";

import type { PointerEvent } from "react";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { logo3DInteractionConfig } from "./hero3d-assets";

export type Logo3DPointerState = {
  x: number;
  y: number;
  hoverX: number;
  hoverY: number;
  dragX: number;
  dragY: number;
  velocityX: number;
  velocityY: number;
  isDragging: boolean;
  isInside: boolean;
  lastClientX: number;
  lastClientY: number;
};

const initialPointerState: Logo3DPointerState = {
  x: 0,
  y: 0,
  hoverX: 0,
  hoverY: 0,
  dragX: 0,
  dragY: 0,
  velocityX: 0,
  velocityY: 0,
  isDragging: false,
  isInside: false,
  lastClientX: 0,
  lastClientY: 0,
};

export function useLogo3DPointer() {
  const prefersReducedMotion = useReducedMotion();
  const stateRef = useRef<Logo3DPointerState>({ ...initialPointerState });

  return useMemo(() => {
    function updateHover(event: PointerEvent<HTMLElement>) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      stateRef.current.x = Math.max(-0.5, Math.min(0.5, x));
      stateRef.current.y = Math.max(-0.5, Math.min(0.5, y));
      stateRef.current.hoverY = stateRef.current.x * logo3DInteractionConfig.hoverY;
      stateRef.current.hoverX = -stateRef.current.y * logo3DInteractionConfig.hoverX;
      stateRef.current.isInside = true;
    }

    function handlePointerMove(event: PointerEvent<HTMLElement>) {
      if (prefersReducedMotion) {
        return;
      }

      updateHover(event);

      if (!stateRef.current.isDragging) {
        return;
      }

      const dx = event.clientX - stateRef.current.lastClientX;
      const dy = event.clientY - stateRef.current.lastClientY;
      stateRef.current.dragY += dx * logo3DInteractionConfig.dragSensitivity;
      stateRef.current.dragX = Math.max(
        logo3DInteractionConfig.dragXMin,
        Math.min(
          logo3DInteractionConfig.dragXMax,
          stateRef.current.dragX + dy * logo3DInteractionConfig.dragSensitivity,
        ),
      );
      stateRef.current.velocityY = dx * logo3DInteractionConfig.dragSensitivity;
      stateRef.current.velocityX = dy * logo3DInteractionConfig.dragSensitivity;
      stateRef.current.lastClientX = event.clientX;
      stateRef.current.lastClientY = event.clientY;
    }

    function handlePointerDown(event: PointerEvent<HTMLElement>) {
      if (prefersReducedMotion) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      updateHover(event);
      stateRef.current.isDragging = true;
      stateRef.current.lastClientX = event.clientX;
      stateRef.current.lastClientY = event.clientY;
    }

    function handlePointerUp(event: PointerEvent<HTMLElement>) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      stateRef.current.isDragging = false;
    }

    function handlePointerLeave() {
      stateRef.current.isInside = false;
      stateRef.current.hoverX = 0;
      stateRef.current.hoverY = 0;
    }

    return {
      stateRef,
      handlePointerMove,
      handlePointerDown,
      handlePointerUp,
      handlePointerLeave,
    };
  }, [prefersReducedMotion]);
}

export function advanceLogo3DPointerInertia(pointer: Logo3DPointerState) {
  if (!pointer.isDragging) {
    pointer.dragY += pointer.velocityY;
    pointer.dragX = Math.max(
      logo3DInteractionConfig.dragXMin,
      Math.min(logo3DInteractionConfig.dragXMax, pointer.dragX + pointer.velocityX),
    );
    pointer.velocityY *= 0.92;
    pointer.velocityX *= 0.9;
  }
}
