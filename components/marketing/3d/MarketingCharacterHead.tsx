import {
  skinMaterial,
  skinShadowMaterial,
  skinWarmMaterial,
} from "./MarketingCharacterMaterials";

export function MarketingCharacterHead() {
  return (
    <group name="Head" rotation={[0.02, -0.08, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.28, 0.06]} scale={[0.38, 0.55, 0.34]}>
        <sphereGeometry args={[1, 48, 36]} />
        <meshStandardMaterial {...skinMaterial} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.09, 0.085]} scale={[0.31, 0.24, 0.28]}>
        <sphereGeometry args={[1, 36, 20]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>

      <mesh castShadow position={[0, -0.22, 0.09]} scale={[0.23, 0.11, 0.22]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial {...skinMaterial} />
      </mesh>

      <mesh position={[-0.25, 0.13, 0.35]} rotation={[0.03, -0.16, -0.2]} scale={[0.12, 0.055, 0.025]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial {...skinWarmMaterial} />
      </mesh>
      <mesh position={[0.25, 0.13, 0.35]} rotation={[0.03, 0.16, 0.2]} scale={[0.12, 0.055, 0.025]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial {...skinWarmMaterial} />
      </mesh>

      <mesh castShadow position={[-0.39, 0.17, 0.04]} rotation={[0, 0.25, -0.12]} scale={[0.065, 0.12, 0.035]}>
        <sphereGeometry args={[1, 18, 12]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>
      <mesh castShadow position={[0.39, 0.17, 0.035]} rotation={[0, -0.2, 0.12]} scale={[0.056, 0.105, 0.03]}>
        <sphereGeometry args={[1, 18, 12]} />
        <meshStandardMaterial {...skinShadowMaterial} />
      </mesh>

      <mesh position={[-0.43, 0.06, 0.075]} rotation={[Math.PI / 2, 0, 0.08]}>
        <torusGeometry args={[0.035, 0.0045, 8, 18]} />
        <meshStandardMaterial color="#c99248" roughness={0.28} metalness={0.68} />
      </mesh>
    </group>
  );
}
