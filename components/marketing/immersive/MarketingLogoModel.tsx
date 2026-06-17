"use client";

import { useEffect, useMemo } from "react";
import { Center, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import {
  Color,
  DoubleSide,
  Group,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  Vector2,
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const logoAssets = {
  model: "/santuario/Logo3D/base.obj",
  fallback: "/santuario/Logo3D/shaded.png",
  textures: {
    diffuse: "/santuario/Logo3D/texture_diffuse.png",
    normal: "/santuario/Logo3D/texture_normal.png",
    roughness: "/santuario/Logo3D/texture_roughness.png",
    metallic: "/santuario/Logo3D/texture_metallic.png",
  },
};

type LogoTextureSet = {
  diffuse: Texture;
  normal: Texture;
  roughness: Texture;
  metallic: Texture;
};

function isMesh(object: Object3D): object is Mesh {
  return object instanceof Mesh;
}

function prepareTexture(texture: Texture, color = false) {
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearFilter;
  texture.flipY = true;

  if (color) {
    texture.colorSpace = SRGBColorSpace;
  }

  texture.needsUpdate = true;
}

function createLogoMaterial(textures: LogoTextureSet, meshName: string) {
  const isIncandescent =
    /flame|fire|heart|llama|core|orange|accent/i.test(meshName);

  return new MeshStandardMaterial({
    map: textures.diffuse,
    normalMap: textures.normal,
    roughnessMap: textures.roughness,
    metalnessMap: textures.metallic,
    color: new Color(isIncandescent ? "#e01818" : "#8f0000"),
    roughness: isIncandescent ? 0.36 : 0.42,
    metalness: isIncandescent ? 0.24 : 0.32,
    emissive: new Color(isIncandescent ? "#ff4a12" : "#360000"),
    emissiveIntensity: isIncandescent ? 0.34 : 0.12,
    envMapIntensity: 1.18,
    side: DoubleSide,
    normalScale: new Vector2(0.68, 0.68),
  });
}

function getMaterialName(object: Mesh) {
  if (Array.isArray(object.material)) {
    return object.material.map((material) => material.name).join(" ");
  }

  return object.material.name;
}

export function MarketingLogoModel() {
  // The requested logo GLB/GLTF paths do not exist; this is the real Santuario Logo3D asset.
  const source = useLoader(OBJLoader, logoAssets.model);
  const textures = useTexture({
    diffuse: logoAssets.textures.diffuse,
    normal: logoAssets.textures.normal,
    roughness: logoAssets.textures.roughness,
    metallic: logoAssets.textures.metallic,
  }) as LogoTextureSet;
  const model = useMemo(() => source.clone(true) as Group, [source]);

  useMemo(() => {
    prepareTexture(textures.diffuse, true);
    prepareTexture(textures.normal);
    prepareTexture(textures.roughness);
    prepareTexture(textures.metallic);
  }, [textures]);

  useEffect(() => {
    model.traverse((object) => {
      if (!isMesh(object)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;
      object.material = createLogoMaterial(textures, `${object.name} ${getMaterialName(object)}`);
    });
  }, [model, textures]);

  return (
    <group position={[0, -0.12, 0]} rotation={[0.08, -0.45, 0.02]} scale={1.55}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

export { logoAssets as marketingLogoAssets };

useLoader.preload(OBJLoader, logoAssets.model);
useTexture.preload([
  logoAssets.textures.diffuse,
  logoAssets.textures.normal,
  logoAssets.textures.roughness,
  logoAssets.textures.metallic,
]);
