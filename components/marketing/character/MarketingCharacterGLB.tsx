"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Float,
  Sparkles,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { motion } from "motion/react";
import {
  AdditiveBlending,
  BackSide,
  Color,
  DataTexture,
  DoubleSide,
  Group,
  LinearFilter,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
  Texture,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { characterAssets } from "./character-assets";
import { MarketingCharacterFallback } from "./MarketingCharacterFallback";
import { MarketingCharacterHalo } from "./MarketingCharacterHalo";
import { useCharacterParallax } from "./useCharacterParallax";

type MaterialRole = "skin" | "hair" | "suit" | "shirt" | "metal" | "eye" | "shoe" | "default";

type CharacterTextureSet = Record<Exclude<MaterialRole, "default" | "eye" | "metal">, Texture>;

function createTexture(kind: keyof CharacterTextureSet) {
  const size = 96;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const n = ((x * 37 + y * 19 + ((x * y) % 31)) % 255) / 255;
      const weave = (x % 9 === 0 || y % 11 === 0 ? 0.16 : 0) + (Math.sin((x + y) * 0.42) * 0.5 + 0.5) * 0.08;
      const strand = Math.sin(x * 0.42 + y * 0.05) * 0.5 + 0.5;

      if (kind === "skin") {
        data[i] = 166 + n * 28;
        data[i + 1] = 91 + n * 16;
        data[i + 2] = 62 + n * 13;
      }

      if (kind === "hair") {
        const value = 8 + strand * 34 + n * 12;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value + 2;
      }

      if (kind === "suit") {
        data[i] = 156 + weave * 80 + n * 12;
        data[i + 1] = 118 + weave * 55 + n * 10;
        data[i + 2] = 78 + weave * 32 + n * 8;
      }

      if (kind === "shirt") {
        const line = x % 18 < 2 || y % 22 < 2 ? 24 : 9;
        data[i] = line + n * 18;
        data[i + 1] = line + n * 18;
        data[i + 2] = line + 4 + n * 22;
      }

      if (kind === "shoe") {
        const value = 6 + n * 28;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      data[i + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(kind === "hair" ? 2.8 : 5.5, kind === "hair" ? 1.2 : 5.5);
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearFilter;
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function useCharacterTextures() {
  return useMemo<CharacterTextureSet>(
    () => ({
      skin: createTexture("skin"),
      hair: createTexture("hair"),
      suit: createTexture("suit"),
      shirt: createTexture("shirt"),
      shoe: createTexture("shoe"),
    }),
    [],
  );
}

function inferMaterialRole(name: string): MaterialRole {
  const value = name.toLowerCase();

  if (/(skin|face|head|neck|hand|ear|body|piel|rostro|cabeza|mano|oreja)/.test(value)) {
    return "skin";
  }

  if (/(hair|brow|cabello|pelo|ceja)/.test(value)) {
    return "hair";
  }

  if (/(suit|blazer|jacket|coat|traje|saco|chaqueta|pants|pantalon)/.test(value)) {
    return "suit";
  }

  if (/(shirt|collar|camisa|pattern|cuello)/.test(value)) {
    return "shirt";
  }

  if (/(chain|necklace|earring|metal|accessory|collar|arete|aro)/.test(value)) {
    return "metal";
  }

  if (/(eye|iris|pupil|ojo)/.test(value)) {
    return "eye";
  }

  if (/(shoe|boot|zapato|calzado)/.test(value)) {
    return "shoe";
  }

  return "default";
}

function createEnhancedMaterial(role: MaterialRole, base: MeshStandardMaterial | MeshPhysicalMaterial | undefined, textures: CharacterTextureSet) {
  const material = base?.clone() ?? new MeshPhysicalMaterial();
  material.side = DoubleSide;
  material.envMapIntensity = 1.22;

  if (role === "skin") {
    material.color = new Color("#b87555");
    material.roughness = 0.64;
    material.metalness = 0;
    material.map = material.map ?? textures.skin;
    material.emissive = new Color("#3f120c");
    material.emissiveIntensity = 0.045;
  }

  if (role === "hair") {
    material.color = new Color("#080808");
    material.roughness = 0.42;
    material.metalness = 0.08;
    material.map = material.map ?? textures.hair;
    material.envMapIntensity = 1.45;
  }

  if (role === "suit") {
    material.color = new Color("#b58a62");
    material.roughness = 0.78;
    material.metalness = 0.02;
    material.map = material.map ?? textures.suit;
  }

  if (role === "shirt") {
    material.color = new Color("#101012");
    material.roughness = 0.68;
    material.metalness = 0.04;
    material.map = material.map ?? textures.shirt;
  }

  if (role === "metal") {
    material.color = new Color("#0d0d0d");
    material.roughness = 0.24;
    material.metalness = 0.82;
    material.envMapIntensity = 1.8;
  }

  if (role === "eye") {
    material.color = new Color("#15100e");
    material.roughness = 0.2;
    material.metalness = 0;
    material.envMapIntensity = 2;
  }

  if (role === "shoe") {
    material.color = new Color("#080808");
    material.roughness = 0.36;
    material.metalness = 0.16;
    material.map = material.map ?? textures.shoe;
  }

  if (role === "default") {
    material.color.offsetHSL(0, 0.04, -0.03);
    material.roughness = Math.max(material.roughness ?? 0.64, 0.56);
    material.metalness = Math.min(material.metalness ?? 0.04, 0.18);
  }

  material.needsUpdate = true;
  return material;
}

function isRenderableMesh(object: Object3D): object is Mesh {
  return object instanceof Mesh;
}

function SantuarioGLBModel() {
  const { scene, animations } = useGLTF(characterAssets.glb);
  const textures = useCharacterTextures();
  const model = useMemo(() => clone(scene) as Group, [scene]);
  const groupRef = useRef<Group>(null);
  const { actions } = useAnimations(animations, model);

  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    firstAction?.reset().fadeIn(0.5).play();

    return () => {
      firstAction?.fadeOut(0.25);
    };
  }, [actions]);

  useEffect(() => {
    model.traverse((object) => {
      if (!isRenderableMesh(object)) {
        return;
      }

      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      const materialName = `${object.name} ${material?.name ?? ""}`;
      const role = inferMaterialRole(materialName);

      object.castShadow = true;
      object.receiveShadow = true;
      object.material = createEnhancedMaterial(
        role,
        material instanceof MeshStandardMaterial || material instanceof MeshPhysicalMaterial
          ? material
          : undefined,
        textures,
      );
    });
  }, [model, textures]);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.045;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.72) * 0.035 - 0.08;
  });

  return (
    <group ref={groupRef} rotation={[0, -0.18, 0]}>
      <Center top={false} position={[0, -1.02, 0]}>
        <primitive object={model} />
      </Center>
    </group>
  );
}

function SantuarioRimShell() {
  return (
    <group position={[0, 0.26, -0.14]}>
      <mesh scale={[2.35, 2.35, 2.35]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#e01818"
          transparent
          opacity={0.08}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.28, 0.08, -0.26]} scale={[1.42, 1.42, 1.42]}>
        <torusGeometry args={[1, 0.008, 12, 160, Math.PI * 1.34]} />
        <meshBasicMaterial
          color="#ff5a00"
          transparent
          opacity={0.72}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SantuarioCharacterScene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#050506", 5.4, 10.6]} />
      <ambientLight intensity={0.42} color="#7c1c12" />
      <directionalLight
        position={[-3.5, 4.2, 3.2]}
        intensity={2.6}
        color="#ff6a2a"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[3.2, 2.8, 2.8]}
        angle={0.34}
        penumbra={0.78}
        intensity={5.4}
        color="#e01818"
      />
      <pointLight position={[-1.8, 1.7, -1.8]} intensity={1.6} color="#ff2a18" />
      <pointLight position={[1.4, 2.3, 1.6]} intensity={0.85} color="#fff0df" />
      <Environment preset="city" environmentIntensity={0.72} />
      <SantuarioRimShell />
      <Float speed={1.12} rotationIntensity={0.1} floatIntensity={0.16}>
        <Bounds fit clip observe margin={1.18}>
          <SantuarioGLBModel />
        </Bounds>
      </Float>
      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.52}
        scale={5.8}
        blur={2.8}
        far={4.8}
        color="#120000"
      />
      <Sparkles
        count={38}
        scale={[3.6, 4.2, 1.5]}
        size={2.2}
        speed={0.28}
        color="#ff5a00"
        opacity={0.35}
      />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.12} intensity={0.34} radius={0.62} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.74} />
      </EffectComposer>
    </>
  );
}

export function MarketingCharacterGLB() {
  const {
    rotateX,
    rotateY,
    haloX,
    haloY,
    handlePointerMove,
    handlePointerLeave,
  } = useCharacterParallax();

  return (
    <div
      className="marketing-character-stage marketing-character-stage--glb"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <MarketingCharacterHalo haloX={haloX} haloY={haloY} />
      <motion.div
        className="marketing-character-glb-depth"
        style={{ rotateX, rotateY }}
      >
        <Canvas
          shadows
          dpr={[1, 1.7]}
          camera={{ position: [0, 0.7, 4.7], fov: 34, near: 0.1, far: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          fallback={<MarketingCharacterFallback />}
        >
          <Suspense fallback={null}>
            <SantuarioCharacterScene />
          </Suspense>
        </Canvas>
      </motion.div>
      <span className="marketing-character-glb-aura" aria-hidden="true" />
    </div>
  );
}

useGLTF.preload(characterAssets.glb);
