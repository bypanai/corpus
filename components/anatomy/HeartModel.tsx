"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box3, Color, Group, Material, Mesh, Plane, Vector3 } from "three";
import type { AnatomyOrgan } from "./organ-data";
import type { FocusMode, StructureSelection } from "./types";

type MaterialState = { depthWrite: boolean; opacity: number; transparent: boolean };

type AnatomyModelProps = {
  autoRotate: boolean;
  organ: AnatomyOrgan;
  showLabels: boolean;
  focusMode: FocusMode;
  clippingPlane?: Plane | null;
  activeHotspotId?: string | null;
  relatedHotspotIds?: string[];
  onStructureSelect?: (selection: StructureSelection | null) => void;
};

function readableMeshName(mesh: Mesh) {
  const name = mesh.name.replace(/[_-]+/g, " ").replace(/\d+/g, "").trim();
  return name && !/^mesh$/i.test(name) ? name.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Model surface";
}

export function AnatomyModel({ activeHotspotId, autoRotate, clippingPlane, focusMode, organ, relatedHotspotIds = [], showLabels, onStructureSelect }: AnatomyModelProps) {
  const { scene } = useGLTF(organ.model, false, true);
  const pivotRef = useRef<Group>(null);
  const originalEmissive = useRef(new WeakMap<Material, Color>());
  const originalMaterialState = useRef(new WeakMap<Material, MaterialState>());
  const model = useMemo(() => scene.clone(true), [scene]);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Mesh | null>(null);

  useLayoutEffect(() => {
    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());
    const centre = bounds.getCenter(new Vector3());
    const scale = 3.8 / Math.max(size.x, size.y, size.z, 0.001);
    model.scale.setScalar(scale);
    model.position.copy(centre.multiplyScalar(-scale));
    model.updateMatrixWorld(true);
  }, [model]);

  useLayoutEffect(() => {
    model.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        if (!("emissive" in material) || !(material.emissive instanceof Color)) return;
        if (!originalEmissive.current.has(material)) originalEmissive.current.set(material, material.emissive.clone());
        material.emissive.copy(mesh === selectedNode ? new Color("#9f3f46") : originalEmissive.current.get(material)!);
      });
    });
  }, [model, selectedNode]);

  useLayoutEffect(() => {
    model.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      mesh.visible = focusMode !== "isolate" || mesh === selectedNode;
      if (!mesh.material) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const emissiveMaterial = material as Material & { emissive?: Color };
        if (!originalEmissive.current.has(material)) originalEmissive.current.set(material, emissiveMaterial.emissive instanceof Color ? emissiveMaterial.emissive.clone() : new Color("#000000"));
        if (!originalMaterialState.current.has(material)) originalMaterialState.current.set(material, { depthWrite: material.depthWrite, opacity: material.opacity, transparent: material.transparent });
        const original = originalMaterialState.current.get(material)!;
        material.transparent = focusMode === "fade";
        material.opacity = focusMode === "fade" ? Math.min(original.opacity, 0.24) : original.opacity;
        material.depthWrite = focusMode === "fade" ? false : original.depthWrite;
        if (focusMode !== "fade") material.transparent = original.transparent;
        material.needsUpdate = true;
      });
    });
  }, [focusMode, model, selectedNode]);

  useLayoutEffect(() => {
    model.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        material.clippingPlanes = clippingPlane ? [clippingPlane] : [];
        material.clipShadows = Boolean(clippingPlane);
        material.needsUpdate = true;
      });
    });
  }, [clippingPlane, model]);

  const clearSelection = useCallback(() => {
    setSelectedHotspotId(null);
    setSelectedNode(null);
    onStructureSelect?.(null);
  }, [onStructureSelect]);

  const visibleHotspotId = activeHotspotId === undefined ? selectedHotspotId : activeHotspotId;

  useFrame((_, delta) => {
    if (autoRotate && pivotRef.current) pivotRef.current.rotation.y += delta * 0.09;
  });

  return (
    <group ref={pivotRef} rotation={[0.05, -0.28, 0]}>
      <primitive
        object={model}
        onClick={(event: { stopPropagation: () => void; object: Mesh }) => {
          event.stopPropagation();
          const next = selectedNode === event.object ? null : event.object;
          setSelectedNode(next);
          setSelectedHotspotId(null);
          onStructureSelect?.(next ? {
            name: readableMeshName(next),
            detail: "This model surface is selected. Named anatomical labels are available at highlighted reference points.",
            source: "model",
          } : null);
        }}
        onPointerMissed={clearSelection}
      />
      {organ.hotspots.map((hotspot) => {
        const selected = hotspot.id === visibleHotspotId || relatedHotspotIds.includes(hotspot.id);
        const hovered = hotspot.id === hoveredHotspotId;
        const markerOpacity = showLabels || selected || hovered ? 1 : 0.48;
        return (
          <group key={hotspot.id} position={hotspot.position}>
            <mesh
              onPointerEnter={(event) => { event.stopPropagation(); setHoveredHotspotId(hotspot.id); }}
              onPointerLeave={() => setHoveredHotspotId(null)}
              onClick={(event) => {
                event.stopPropagation();
                const next = selected ? null : hotspot.id;
                setSelectedHotspotId(next);
                setSelectedNode(null);
                onStructureSelect?.(next ? { id: hotspot.id, name: hotspot.label, detail: hotspot.detail, source: "hotspot" } : null);
              }}
            >
              <sphereGeometry args={[selected || hovered ? 0.13 : 0.105, 24, 24]} />
              <meshBasicMaterial color="white" opacity={markerOpacity} transparent toneMapped={false} />
            </mesh>
            <mesh scale={selected || hovered ? 0.7 : 0.55}>
              <sphereGeometry args={[0.105, 24, 24]} />
              <meshBasicMaterial color={hotspot.color} opacity={markerOpacity} transparent toneMapped={false} />
            </mesh>
            <mesh scale={selected || hovered ? 0.9 : 0.72}>
              <ringGeometry args={[0.125, 0.15, 28]} />
              <meshBasicMaterial color={hotspot.color} opacity={markerOpacity} transparent toneMapped={false} side={2} />
            </mesh>
            {(selected || hovered) && (
              <Html center position={[0, 0.2, 0]}>
                <span className={`anatomy-marker-label ${selected ? "selected" : ""} ${hovered ? "hovered" : ""}`}>
                  {hotspot.label}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

useGLTF.preload("/models/heart.glb", false, true);
