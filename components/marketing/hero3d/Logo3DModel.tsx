"use client";

import { Center } from "@react-three/drei";
import { useLogo3DModel } from "./useLogo3DModel";

export function Logo3DModel() {
  const model = useLogo3DModel();

  return (
    <Center>
      <primitive object={model} />
    </Center>
  );
}
