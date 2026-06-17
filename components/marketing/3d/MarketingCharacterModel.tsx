"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { MarketingCharacterBody } from "./MarketingCharacterBody";
import { MarketingCharacterFaceDetails } from "./MarketingCharacterFaceDetails";
import { MarketingCharacterHair } from "./MarketingCharacterHair";
import { MarketingCharacterHead } from "./MarketingCharacterHead";

export function MarketingCharacterModel() {
  const breathingRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!breathingRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    breathingRef.current.scale.y = 1 + Math.sin(elapsed * 1.02) * 0.005;
    breathingRef.current.position.y = Math.sin(elapsed * 0.72) * 0.008;
  });

  /*
    Future .glb swap point:
    const gltf = useGLTF("/models/marketing-character.glb");
    return <primitive object={gltf.scene} />;
  */
  return (
    <group
      ref={breathingRef}
      name="SantuarioMarketingCharacter"
      position={[0, -0.98, 0]}
      rotation={[0.02, -0.3, 0]}
      scale={1.06}
    >
      <MarketingCharacterBody />
      <MarketingCharacterHead />
      <MarketingCharacterFaceDetails />
      <MarketingCharacterHair />
    </group>
  );
}
