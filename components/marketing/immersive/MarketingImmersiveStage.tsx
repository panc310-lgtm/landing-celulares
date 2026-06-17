"use client";

import type { ErrorInfo, ReactNode } from "react";
import { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MarketingLogoScene } from "./MarketingLogoScene";
import { MarketingSceneFallback } from "./MarketingSceneFallback";
import { MarketingTextureLayers } from "./MarketingTextureLayers";
import { useImmersivePointer } from "./useImmersivePointer";

type MarketingImmersiveBoundaryProps = {
  children: ReactNode;
};

type MarketingImmersiveBoundaryState = {
  hasError: boolean;
};

class MarketingImmersiveBoundary extends Component<
  MarketingImmersiveBoundaryProps,
  MarketingImmersiveBoundaryState
> {
  state: MarketingImmersiveBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("MarketingImmersiveStage failed, using logo fallback.", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <MarketingSceneFallback />;
    }

    return this.props.children;
  }
}

export function MarketingImmersiveStage() {
  const {
    pointerState,
    handlePointerMove,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
  } = useImmersivePointer();

  return (
    <div
      className="marketing-immersive-stage"
      aria-label="Logo 3D interactivo de Santuario Marketing"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <MarketingTextureLayers />
      <MarketingImmersiveBoundary>
        <Canvas
          shadows
          dpr={[1, 1.65]}
          camera={{ position: [0, 0.35, 6.2], fov: 36 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          fallback={<MarketingSceneFallback />}
        >
          <Suspense fallback={null}>
            <MarketingLogoScene pointerState={pointerState} />
          </Suspense>
        </Canvas>
      </MarketingImmersiveBoundary>
    </div>
  );
}
