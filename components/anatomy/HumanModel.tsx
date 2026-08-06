"use client"

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh } from "three"

export function HumanModel() {
  const ref = useRef<Mesh | null>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.18
    ref.current.position.y = Math.sin(t * 0.9) * 0.15
  })

  return (
    <mesh ref={ref} castShadow receiveShadow position={[0, 0.05, 0]}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <meshPhysicalMaterial
        color="#94a3b8"
        metalness={0.25}
        roughness={0.2}
        clearcoat={0.5}
        clearcoatRoughness={0.15}
        reflectivity={0.65}
      />
    </mesh>
  )
}
