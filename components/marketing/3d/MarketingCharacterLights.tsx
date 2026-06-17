export function MarketingCharacterLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        color="#fff1dd"
        intensity={1.2}
        position={[-2.4, 3.1, 4.4]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight color="#ff3513" intensity={2.5} distance={4.8} position={[1.3, 0.78, -1.15]} />
      <pointLight color="#ff7a18" intensity={0.7} distance={4.6} position={[-1.6, 0.05, 1.2]} />
      <spotLight
        color="#ff9a4d"
        intensity={1.1}
        angle={0.42}
        penumbra={0.82}
        position={[2.25, 2.4, 2.25]}
        target-position={[0, -0.5, 0]}
      />
      <spotLight
        color="#ff1f12"
        intensity={1.35}
        angle={0.34}
        penumbra={0.9}
        position={[2.3, 0.6, -1.9]}
        target-position={[0, -0.45, 0]}
      />
    </>
  );
}
