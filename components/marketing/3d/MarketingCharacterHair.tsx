import { useMemo } from "react";
import * as THREE from "three";
import {
  hairHighlightMaterial,
  hairMaterial,
} from "./MarketingCharacterMaterials";

type StrandConfig = {
  points: [number, number, number][];
  radius: number;
  highlight?: boolean;
};

function HairStrand({ points, radius, highlight }: StrandConfig) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(curve, 18, radius, 8, false);
  }, [points, radius]);

  return (
    <mesh castShadow geometry={geometry}>
      <meshStandardMaterial {...(highlight ? hairHighlightMaterial : hairMaterial)} />
    </mesh>
  );
}

export function MarketingCharacterHair() {
  const strands = useMemo<StrandConfig[]>(
    () => [
      {
        points: [
          [-0.05, 0.88, 0.31],
          [-0.11, 0.72, 0.37],
          [-0.16, 0.55, 0.35],
          [-0.18, 0.39, 0.32],
        ],
        radius: 0.022,
        highlight: true,
      },
      {
        points: [
          [0.04, 0.88, 0.31],
          [0.12, 0.72, 0.37],
          [0.19, 0.56, 0.35],
          [0.22, 0.39, 0.31],
        ],
        radius: 0.023,
      },
      {
        points: [
          [-0.16, 0.82, 0.25],
          [-0.29, 0.66, 0.26],
          [-0.34, 0.44, 0.18],
          [-0.33, 0.18, 0.08],
        ],
        radius: 0.045,
      },
      {
        points: [
          [0.15, 0.82, 0.24],
          [0.3, 0.66, 0.22],
          [0.38, 0.42, 0.1],
          [0.36, 0.16, -0.02],
        ],
        radius: 0.052,
      },
      {
        points: [
          [-0.26, 0.76, 0.08],
          [-0.42, 0.58, 0.02],
          [-0.43, 0.32, -0.05],
        ],
        radius: 0.062,
      },
      {
        points: [
          [0.26, 0.76, 0.07],
          [0.43, 0.56, -0.02],
          [0.44, 0.26, -0.12],
        ],
        radius: 0.066,
      },
      {
        points: [
          [0, 0.9, -0.05],
          [-0.18, 0.76, -0.2],
          [-0.25, 0.46, -0.24],
        ],
        radius: 0.08,
      },
      {
        points: [
          [0.04, 0.9, -0.05],
          [0.22, 0.74, -0.2],
          [0.29, 0.43, -0.24],
        ],
        radius: 0.083,
      },
    ],
    []
  );

  return (
    <group name="Hair">
      <mesh castShadow position={[0, 0.66, -0.03]} scale={[0.45, 0.32, 0.39]}>
        <sphereGeometry args={[1, 36, 22]} />
        <meshStandardMaterial {...hairMaterial} />
      </mesh>
      <mesh castShadow position={[0, 0.88, 0.02]} scale={[0.38, 0.17, 0.34]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial {...hairHighlightMaterial} />
      </mesh>

      <mesh position={[0, 0.82, 0.335]} rotation={[0.08, 0, 0]} scale={[0.018, 0.16, 0.008]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.68} />
      </mesh>

      {strands.map((strand, index) => (
        <HairStrand key={index} {...strand} />
      ))}
    </group>
  );
}
