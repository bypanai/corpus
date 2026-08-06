"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </div>
  );
}