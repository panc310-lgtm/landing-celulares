export const hero3DAssets = {
  // No GLB/GLTF logo exists in public/santuario; the real logo model is this OBJ with PBR maps.
  model: "/santuario/Logo3D/base.obj",
  fallback: "/santuario/Logo3D/shaded.png",
  textures: {
    diffuse: "/santuario/Logo3D/texture_diffuse.png",
    normal: "/santuario/Logo3D/texture_normal.png",
    roughness: "/santuario/Logo3D/texture_roughness.png",
    metallic: "/santuario/Logo3D/texture_metallic.png",
    pbr: "/santuario/Logo3D/texture_pbr.png",
  },
};

export const logo3DInteractionConfig = {
  hoverX: 0.18,
  hoverY: 0.35,
  dragXMin: -0.55,
  dragXMax: 0.55,
  dragSensitivity: 0.0085,
  easing: 0.085,
};

export const logo3DParticleConfig = {
  // Tune these first if the scene becomes too busy or too heavy.
  dustCount: 260,
  flowCount: 220,
  burstCount: 160,
  flowSpeed: 0.42,
  cursorInfluence: 0.16,
};
