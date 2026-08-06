export function ViewerLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#e8f4ff", "#182234", 0.7]} />
      <directionalLight castShadow intensity={2.2} position={[4.8, 6.5, 6.8]} />
      <directionalLight intensity={0.8} position={[-4.5, 1.2, 5.2]} color="#c9d8ff" />
      <pointLight intensity={0.8} distance={11} position={[-3, -1.4, 3.5]} color="#67e8f9" />
    </>
  );
}
