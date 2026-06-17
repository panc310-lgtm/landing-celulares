import { useMemo } from "react";
import {
  eyeMaterial,
  lipMaterial,
  skinShadowMaterial,
  skinWarmMaterial,
} from "./MarketingCharacterMaterials";

function SkinSpeckles() {
  const speckles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const row = Math.floor(index / 2);
        const x = side * (0.05 + ((row * 17) % 15) / 100);
        const y = 0.17 - row * 0.018 + ((index * 7) % 5) / 500;
        const z = 0.405 - Math.abs(x) * 0.08;
        const size = 0.006 + ((index * 11) % 5) / 1000;

        return { position: [x, y, z] as [number, number, number], size };
      }),
    []
  );

  return (
    <>
      {speckles.map((speckle, index) => (
        <mesh key={index} position={speckle.position} scale={[speckle.size, speckle.size, 0.004]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#66301f" roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}

export function MarketingCharacterFaceDetails() {
  return (
    <group name="FaceDetails" rotation={[0.02, -0.08, 0]}>
      <mesh position={[-0.13, 0.27, 0.388]} rotation={[0, -0.05, -0.02]} scale={[0.058, 0.021, 0.012]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial {...eyeMaterial} />
      </mesh>
      <mesh position={[0.13, 0.27, 0.388]} rotation={[0, 0.05, 0.02]} scale={[0.058, 0.021, 0.012]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial {...eyeMaterial} />
      </mesh>

      <mesh position={[-0.13, 0.303, 0.391]} rotation={[0, 0, 0.04]} scale={[0.077, 0.013, 0.009]}>
        <sphereGeometry args={[1, 18, 8]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>
      <mesh position={[0.13, 0.303, 0.391]} rotation={[0, 0, -0.04]} scale={[0.077, 0.013, 0.009]}>
        <sphereGeometry args={[1, 18, 8]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>

      <mesh position={[-0.14, 0.38, 0.385]} rotation={[0, 0, 0.16]} scale={[0.125, 0.016, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#120d0b" roughness={0.58} />
      </mesh>
      <mesh position={[0.14, 0.38, 0.385]} rotation={[0, 0, -0.16]} scale={[0.125, 0.016, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#120d0b" roughness={0.58} />
      </mesh>

      <mesh castShadow position={[0, 0.14, 0.425]} rotation={[Math.PI / 2, 0, 0]} scale={[0.052, 0.145, 0.045]}>
        <coneGeometry args={[1, 1, 22]} />
        <meshStandardMaterial {...skinWarmMaterial} />
      </mesh>
      <mesh position={[0, 0.04, 0.447]} scale={[0.088, 0.045, 0.034]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>
      <mesh position={[-0.055, 0.012, 0.469]} scale={[0.018, 0.008, 0.007]}>
        <sphereGeometry args={[1, 10, 6]} />
        <meshStandardMaterial color="#170806" roughness={0.75} />
      </mesh>
      <mesh position={[0.055, 0.012, 0.469]} scale={[0.018, 0.008, 0.007]}>
        <sphereGeometry args={[1, 10, 6]} />
        <meshStandardMaterial color="#170806" roughness={0.75} />
      </mesh>

      <mesh position={[0, -0.105, 0.418]} rotation={[0, 0, 0.005]} scale={[0.155, 0.019, 0.013]}>
        <sphereGeometry args={[1, 24, 10]} />
        <meshStandardMaterial {...lipMaterial} />
      </mesh>
      <mesh position={[0, -0.073, 0.423]} scale={[0.12, 0.012, 0.01]}>
        <sphereGeometry args={[1, 24, 8]} />
        <meshStandardMaterial color="#7b3028" roughness={0.66} />
      </mesh>
      <mesh position={[0, -0.088, 0.438]} scale={[0.15, 0.005, 0.006]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1b0908" roughness={0.78} />
      </mesh>

      <mesh position={[-0.19, 0.09, 0.384]} rotation={[0, -0.2, -0.18]} scale={[0.095, 0.032, 0.011]}>
        <sphereGeometry args={[1, 18, 8]} />
        <meshStandardMaterial color="#7a3d2b" roughness={0.86} />
      </mesh>
      <mesh position={[0.19, 0.09, 0.384]} rotation={[0, 0.2, 0.18]} scale={[0.095, 0.032, 0.011]}>
        <sphereGeometry args={[1, 18, 8]} />
        <meshStandardMaterial color="#7a3d2b" roughness={0.86} />
      </mesh>

      <SkinSpeckles />
    </group>
  );
}
