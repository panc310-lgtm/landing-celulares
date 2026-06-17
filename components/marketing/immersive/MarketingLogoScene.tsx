"use client";

import type { MutableRefObject } from "react";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import { MarketingEnergyFlow } from "./MarketingEnergyFlow";
import { MarketingLogoLights } from "./MarketingLogoLights";
import { MarketingLogoModel } from "./MarketingLogoModel";
import { MarketingLogoRig } from "./MarketingLogoRig";
import { MarketingParticlesField } from "./MarketingParticlesField";
import { MarketingRings } from "./MarketingRings";
import type { ImmersivePointerState } from "./useImmersivePointer";

type MarketingLogoSceneProps = {
  pointerState: MutableRefObject<ImmersivePointerState>;
};

export function MarketingLogoScene({ pointerState }: MarketingLogoSceneProps) {
  return (
    <>
      <MarketingLogoLights />
      <Environment preset="night" environmentIntensity={0.72} background={false} />
      <MarketingParticlesField density="stage" pointerState={pointerState} />
      <MarketingEnergyFlow variant="stage" pointerState={pointerState} />
      <MarketingRings pointerState={pointerState} />
      <Float speed={0.82} rotationIntensity={0.025} floatIntensity={0.055}>
        <MarketingLogoRig pointerState={pointerState}>
          <MarketingLogoModel />
        </MarketingLogoRig>
      </Float>
      <ContactShadows
        position={[0, -1.38, 0]}
        opacity={0.5}
        scale={5.4}
        blur={2.8}
        far={4.8}
        color="#140000"
      />
    </>
  );
}
