export function Logo3DLighting() {
  return (
    <>
      <fog attach="fog" args={["#050506", 5.2, 11]} />
      <ambientLight intensity={0.28} color="#68130d" />
      <directionalLight
        position={[-3.4, 4.4, 3.6]}
        intensity={2.8}
        color="#ff6a2a"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[2.8, 2.5, 2.9]}
        angle={0.34}
        penumbra={0.82}
        intensity={4.8}
        color="#e01818"
      />
      <pointLight position={[0.4, 0.35, 2.1]} intensity={1.5} color="#fff0df" />
      <pointLight position={[-2.4, -0.8, 1.7]} intensity={1.45} color="#ff2b18" />
      <pointLight position={[2.4, 1.4, -1.4]} intensity={1.1} color="#ff5a00" />
    </>
  );
}
