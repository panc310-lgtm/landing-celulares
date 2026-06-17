"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MarketingEnergyFlow } from "./MarketingEnergyFlow";
import { MarketingParticlesField } from "./MarketingParticlesField";

export function MarketingGlobalAtmosphere() {
  return (
    <div className="marketing-global-particle-layer" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <MarketingParticlesField density="global" />
          <MarketingEnergyFlow variant="global" />
        </Suspense>
      </Canvas>
    </div>
  );
}
