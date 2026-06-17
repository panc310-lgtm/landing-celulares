"use client";

import type { MutableRefObject } from "react";
import { Bounds, ContactShadows, Environment, Float, Text } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Logo3DInteractionRig } from "./Logo3DInteractionRig";
import { Logo3DLighting } from "./Logo3DLighting";
import { Logo3DModel } from "./Logo3DModel";
import { Logo3DParticles } from "./Logo3DParticles";
import { Logo3DRings } from "./Logo3DRings";
import type { Logo3DPointerState } from "./useLogo3DPointer";

type Logo3DSceneProps = {
  pointerState: MutableRefObject<Logo3DPointerState>;
};

export function Logo3DScene({ pointerState }: Logo3DSceneProps) {
  return (
    <>
      <Logo3DLighting />
      <Environment preset="night" environmentIntensity={0.82} />
      <Logo3DParticles pointerState={pointerState} />
      <Logo3DRings pointerState={pointerState} />
      <Float speed={0.92} rotationIntensity={0.045} floatIntensity={0.09}>
        <Logo3DInteractionRig pointerState={pointerState}>
          <Bounds fit clip observe margin={1.18}>
            <Logo3DModel />
          </Bounds>
        </Logo3DInteractionRig>
      </Float>
      <Text
        position={[0, -1.58, -0.12]}
        fontSize={0.11}
        letterSpacing={0.16}
        color="#ff5a00"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.58}
      >
        SANTUARIOWAV
      </Text>
      <ContactShadows
        position={[0, -1.24, 0]}
        opacity={0.52}
        scale={5.5}
        blur={2.6}
        far={4.6}
        color="#140000"
      />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.12} intensity={0.38} radius={0.58} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.68} />
      </EffectComposer>
    </>
  );
}
