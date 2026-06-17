import type { MeshStandardMaterialParameters } from "three";

export const SHOW_REFERENCE_OVERLAY = false;

export const rostroReferences = {
  primary: "/santuario/rostro/sujeto.png",
  turnaround: "/santuario/rostro/ChatGPT Image 10 jun 2026, 03_33_07 p.m..png",
  reference: "/santuario/rostro/ChatGPT Image 10 jun 2026, 10_27_41 a.m..png",
};

export const skinMaterial: MeshStandardMaterialParameters = {
  color: "#b86f4b",
  roughness: 0.72,
  metalness: 0,
};

export const skinShadowMaterial: MeshStandardMaterialParameters = {
  color: "#8e4b33",
  roughness: 0.78,
  metalness: 0,
};

export const skinWarmMaterial: MeshStandardMaterialParameters = {
  color: "#d18a62",
  roughness: 0.74,
  metalness: 0,
};

export const hairMaterial: MeshStandardMaterialParameters = {
  color: "#070707",
  roughness: 0.62,
  metalness: 0.05,
};

export const hairHighlightMaterial: MeshStandardMaterialParameters = {
  color: "#151515",
  roughness: 0.58,
  metalness: 0.04,
};

export const blazerMaterial: MeshStandardMaterialParameters = {
  color: "#b98d68",
  roughness: 0.82,
  metalness: 0,
};

export const blazerDarkMaterial: MeshStandardMaterialParameters = {
  color: "#9e744f",
  roughness: 0.84,
  metalness: 0,
};

export const shirtMaterial: MeshStandardMaterialParameters = {
  color: "#0a0a0b",
  roughness: 0.68,
  metalness: 0,
};

export const lipMaterial: MeshStandardMaterialParameters = {
  color: "#5f211e",
  roughness: 0.64,
  metalness: 0,
};

export const eyeMaterial: MeshStandardMaterialParameters = {
  color: "#100807",
  roughness: 0.22,
  metalness: 0,
};

export const accessoryMaterial: MeshStandardMaterialParameters = {
  color: "#080808",
  roughness: 0.3,
  metalness: 0.35,
};
