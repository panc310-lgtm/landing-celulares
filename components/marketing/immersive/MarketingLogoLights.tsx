export function MarketingLogoLights() {
  return (
    <>
      <fog attach="fog" args={["#050506", 5.4, 11.5]} />
      <ambientLight intensity={0.24} color="#690000" />
      <directionalLight
        position={[-3.8, 4.2, 3.7]}
        intensity={2.45}
        color="#ff4a12"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[2.7, 2.6, 3.2]}
        angle={0.34}
        penumbra={0.84}
        intensity={4.2}
        color="#e01818"
      />
      <pointLight position={[0.3, 0.5, 2.2]} intensity={1.35} color="#fff0df" />
      <pointLight position={[-2.8, -1.1, 1.5]} intensity={1.4} color="#ff2818" />
      <pointLight position={[2.8, 1.2, -1.6]} intensity={1.05} color="#ff5a00" />
    </>
  );
}
