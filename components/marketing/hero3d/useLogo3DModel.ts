"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  Color,
  DoubleSide,
  Group,
  LinearFilter,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  Vector2,
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { hero3DAssets } from "./hero3d-assets";

type LogoTextureSet = {
  diffuse: Texture;
  normal: Texture;
  roughness: Texture;
  metallic: Texture;
  pbr: Texture;
};

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

function isMesh(object: Object3D): object is Mesh {
  return object instanceof Mesh;
}

function createLogoMaterial(textures: LogoTextureSet) {
  return new MeshPhysicalMaterial({
    map: textures.diffuse,
    normalMap: textures.normal,
    roughnessMap: textures.roughness,
    metalnessMap: textures.metallic,
    metalness: 0.82,
    roughness: 0.31,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
    reflectivity: 0.76,
    envMapIntensity: 1.58,
    color: new Color("#d91f14"),
    emissive: new Color("#4d0704"),
    emissiveIntensity: 0.12,
    side: DoubleSide,
    normalScale: new Vector2(0.72, 0.72),
  });
}

export function useLogo3DModel() {
  // The available Santuario logo model is OBJ + PBR maps, not GLB/GLTF.
  const source = useLoader(OBJLoader, hero3DAssets.model);
  const textures = useTexture({
    diffuse: hero3DAssets.textures.diffuse,
    normal: hero3DAssets.textures.normal,
    roughness: hero3DAssets.textures.roughness,
    metallic: hero3DAssets.textures.metallic,
    pbr: hero3DAssets.textures.pbr,
  }) as LogoTextureSet;
  const model = useMemo(() => source.clone(true) as Group, [source]);

  useMemo(() => {
    prepareTexture(textures.diffuse, true);
    prepareTexture(textures.pbr, true);
    prepareTexture(textures.normal);
    prepareTexture(textures.roughness);
    prepareTexture(textures.metallic);
  }, [textures]);

  useEffect(() => {
    const logoMaterial = createLogoMaterial(textures);

    model.traverse((object) => {
      if (!isMesh(object)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;
      object.material = logoMaterial.clone();
    });
  }, [model, textures]);

  return model;
}

useLoader.preload(OBJLoader, hero3DAssets.model);
useTexture.preload([
  hero3DAssets.textures.diffuse,
  hero3DAssets.textures.normal,
  hero3DAssets.textures.roughness,
  hero3DAssets.textures.metallic,
  hero3DAssets.textures.pbr,
]);
