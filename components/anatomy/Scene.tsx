"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useMemo, useRef } from "react"
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"
import { HumanModel } from "./HumanModel"
import { Loading } from "./Loading"
import type { Group } from "three"

function FloatingLights() {
  const group = useRef<Group>(null)
  const positions = useMemo(
    () => [
      [2.2, 1.8, 1.5],
      [-2.1, 1.6, -1.2],
      [0.4, 2.3, -2.0],
    ] as const,
    []
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.children.forEach((light, index) => {
      light.position.x = positions[index][0] + Math.sin(t * (0.9 + index * 0.15)) * 0.4
      light.position.y = positions[index][1] + Math.cos(t * (1.1 + index * 0.2)) * 0.35
      light.position.z = positions[index][2] + Math.sin(t * (1.3 + index * 0.12)) * 0.32
    })
  })

  return (
    <group ref={group}>
      {positions.map((position, index) => (
        <pointLight
          key={index}
          position={position}
          distance={5}
          intensity={1.2}
          color={index === 0 ? "#7dd3fc" : index === 1 ? "#a78bfa" : "#f472b6"}
          decay={2}
        />
      ))}
    </group>
  )
}

export default function Scene() {
  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/40">
      <Canvas shadows dpr={[1, 2]} className="h-full w-full">
        <color attach="background" args={["#020817"]} />
        <Suspense fallback={<Loading />}>
          <PerspectiveCamera makeDefault fov={42} position={[0, 1.8, 5]} />
          <ambientLight intensity={0.32} />
          <directionalLight intensity={0.9} position={[4, 5, 2]} />
          <HumanModel />
          <FloatingLights />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={16} blur={2.8} far={4} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={3} maxDistance={8} maxPolarAngle={Math.PI / 2.4} />
      </Canvas>
    </div>
  )
}
