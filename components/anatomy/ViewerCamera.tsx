"use client";

import { OrbitControls } from "@react-three/drei";
import type { RefObject } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export function ViewerCamera({ controlsRef, onStart }: { controlsRef: RefObject<OrbitControlsImpl | null>; onStart?: () => void }) {
  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.055} enablePan={false} minDistance={4.8} maxDistance={12} maxPolarAngle={Math.PI / 2.05} onStart={onStart} target={[0, 0.02, 0]} />;
}
