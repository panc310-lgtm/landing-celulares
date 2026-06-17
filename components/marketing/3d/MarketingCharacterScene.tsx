"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MarketingCharacterEffects } from "./MarketingCharacterEffects";
import { MarketingCharacterFallback } from "./MarketingCharacterFallback";
import { MarketingCharacterLights } from "./MarketingCharacterLights";
import { MarketingCharacterModel } from "./MarketingCharacterModel";
import { MarketingCharacterRig } from "./MarketingCharacterRig";

export function MarketingCharacterScene() {
  return (
    <div
      className="marketing-phase-two__scene"
      aria-label="Modelo 3D estilizado de Santuario Marketing"
    >
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 1.25, 5.2], fov: 38, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        fallback={<MarketingCharacterFallback />}
      >
        <color attach="background" args={["#050506"]} />
        <fog attach="fog" args={["#050506", 6.5, 12]} />

        <Suspense fallback={null}>
          <MarketingCharacterLights />
          <MarketingCharacterEffects />
          <MarketingCharacterRig>
            <MarketingCharacterModel />
          </MarketingCharacterRig>
        </Suspense>
      </Canvas>
    </div>
  );
}
