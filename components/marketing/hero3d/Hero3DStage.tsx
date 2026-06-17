"use client";

import type { ErrorInfo, ReactNode } from "react";
import { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Logo3DFallback } from "./Logo3DFallback";
import { Logo3DScene } from "./Logo3DScene";
import { useLogo3DPointer } from "./useLogo3DPointer";

type Hero3DErrorBoundaryProps = {
  children: ReactNode;
};

type Hero3DErrorBoundaryState = {
  hasError: boolean;
};

class Hero3DErrorBoundary extends Component<
  Hero3DErrorBoundaryProps,
  Hero3DErrorBoundaryState
> {
  state: Hero3DErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Hero3DStage failed, using logo fallback.", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <Logo3DFallback />;
    }

    return this.props.children;
  }
}

export function Hero3DStage() {
  const {
    stateRef,
    handlePointerMove,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
  } = useLogo3DPointer();

  return (
    // Stage 3D: adjust size/position in `.hero3d-stage`; particle density/speed in `hero3d-assets.ts`.
    <div
      className="hero3d-stage"
      aria-label="Logo 3D interactivo de Santuario Marketing"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <Hero3DErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 1.65]}
          camera={{ position: [0, 0.2, 5.8], fov: 34, near: 0.1, far: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: "high-performance",
          }}
          fallback={<Logo3DFallback />}
        >
          <Suspense fallback={null}>
            <Logo3DScene pointerState={stateRef} />
          </Suspense>
        </Canvas>
      </Hero3DErrorBoundary>
      <span className="hero3d-stage-aura" aria-hidden="true" />
    </div>
  );
}
