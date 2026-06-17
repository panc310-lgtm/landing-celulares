import { RoundedBox } from "@react-three/drei";
import {
  accessoryMaterial,
  blazerDarkMaterial,
  blazerMaterial,
  shirtMaterial,
  skinShadowMaterial,
} from "./MarketingCharacterMaterials";

function ShirtPattern() {
  const lines = [
    [-0.1, -0.88, 0.336, 0.18, 0.012, 0.006, 0.35],
    [0.12, -1.02, 0.338, 0.2, 0.012, 0.006, -0.26],
    [-0.04, -1.17, 0.34, 0.16, 0.012, 0.006, -0.62],
    [0.08, -1.32, 0.342, 0.18, 0.012, 0.006, 0.54],
    [-0.14, -1.44, 0.344, 0.13, 0.012, 0.006, 0.18],
    [0.02, -0.72, 0.346, 0.12, 0.01, 0.006, -0.12],
  ];

  return (
    <>
      {lines.map(([x, y, z, width, height, depth, rotate], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0, 0, rotate]}
          scale={[width, height, depth]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={index % 2 ? "#6b6b66" : "#d06b36"} roughness={0.62} />
        </mesh>
      ))}
    </>
  );
}

function Chain() {
  return (
    <group name="Chain">
      {Array.from({ length: 15 }, (_, index) => {
        const angle = Math.PI * 0.2 + (index / 14) * Math.PI * 0.6;
        const x = Math.cos(angle) * 0.27;
        const y = -0.48 - Math.sin(angle) * 0.14;

        return (
          <mesh key={index} position={[x, y, 0.382]} scale={[0.024, 0.024, 0.024]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial {...accessoryMaterial} />
          </mesh>
        );
      })}
    </group>
  );
}

export function MarketingCharacterBody() {
  return (
    <group name="Body">
      <mesh castShadow position={[0, -0.22, 0.03]} scale={[0.14, 0.23, 0.14]}>
        <cylinderGeometry args={[1, 0.86, 1, 28]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>

      <group position={[0, -1.16, 0]}>
        <RoundedBox
          castShadow
          receiveShadow
          args={[1.28, 1.52, 0.44]}
          radius={0.12}
          smoothness={6}
          position={[0, -0.18, 0]}
        >
          <meshStandardMaterial {...blazerMaterial} />
        </RoundedBox>

        <mesh castShadow position={[-0.72, -0.27, -0.02]} rotation={[0.05, 0, 0.22]}>
          <capsuleGeometry args={[0.17, 1.04, 8, 18]} />
          <meshStandardMaterial {...blazerMaterial} />
        </mesh>
        <mesh castShadow position={[0.72, -0.27, -0.02]} rotation={[0.05, 0, -0.22]}>
          <capsuleGeometry args={[0.17, 1.04, 8, 18]} />
          <meshStandardMaterial {...blazerDarkMaterial} />
        </mesh>

        <mesh position={[0, -0.1, 0.255]} scale={[0.5, 0.94, 0.035]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial {...shirtMaterial} />
        </mesh>

        <mesh position={[-0.27, -0.08, 0.31]} rotation={[0, 0, -0.19]} scale={[0.17, 0.94, 0.04]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#c09a74" roughness={0.84} metalness={0} />
        </mesh>
        <mesh position={[0.27, -0.08, 0.31]} rotation={[0, 0, 0.19]} scale={[0.17, 0.94, 0.04]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial {...blazerDarkMaterial} />
        </mesh>

        <mesh position={[-0.41, -0.28, 0.335]} rotation={[0, 0, -0.1]} scale={[0.14, 0.018, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7c563a" roughness={0.86} />
        </mesh>
        <mesh position={[0.4, -0.28, 0.335]} rotation={[0, 0, 0.1]} scale={[0.14, 0.018, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7c563a" roughness={0.86} />
        </mesh>

        <mesh position={[0, 0.46, 0.34]} scale={[0.52, 0.1, 0.035]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#141415" roughness={0.68} />
        </mesh>

        <ShirtPattern />
        <Chain />
      </group>
    </group>
  );
}
