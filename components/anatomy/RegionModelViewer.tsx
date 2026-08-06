"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { Box3, Color, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";

export const regionalModels = {
  "head-neck": { title: "Head & neck", description: "A regional foundation for future cranial, cervical, sensory and neurovascular overlays.", parts: [{ id: "head", label: "Head", color: "#d4b69d" }, { id: "neck", label: "Neck", color: "#be9d8c" }] },
  abdomen: { title: "Abdomen", description: "Explore key digestive and urinary structures as independently controlled regional assets.", parts: [{ id: "liver", label: "Liver", color: "#9b5f4e" }, { id: "pancreas", label: "Pancreas", color: "#e0b68a" }, { id: "right-kidney", label: "Right kidney", color: "#9d685f" }, { id: "left-kidney", label: "Left kidney", color: "#9d685f" }, { id: "small-intestine", label: "Small intestine", color: "#cc9a85" }, { id: "colon", label: "Colon", color: "#b8796e" }] },
  limbs: { title: "Limbs", description: "Paired upper-limb and lower-limb regional assets, ready for future muscular, vascular and neural overlays.", parts: [{ id: "right-upper-limb", label: "Right upper limb", color: "#d2baa0" }, { id: "left-upper-limb", label: "Left upper limb", color: "#d2baa0" }, { id: "lower-limbs", label: "Lower limbs", color: "#c8ad91" }] },
} as const;

type RegionKey = keyof typeof regionalModels;
type Part = (typeof regionalModels)[RegionKey]["parts"][number];

function PartMesh({ isolated, part, selected }: { isolated: boolean; part: Part; selected: boolean }) {
  const { scene } = useGLTF(`/models/regions/${part.id}.glb`, false, false, (loader) => loader.setMeshoptDecoder(MeshoptDecoder));
  const model = useMemo(() => scene.clone(true), [scene]);
  useLayoutEffect(() => { model.traverse((node) => { if ((node as Mesh).isMesh) { const mesh = node as Mesh; mesh.visible = isolated ? selected : true; mesh.material = new MeshStandardMaterial({ color: new Color(part.color), roughness: 0.6, transparent: !selected, opacity: selected ? 1 : 0.12, depthWrite: selected }); } }); }, [isolated, model, part.color, selected]);
  return <primitive object={model} />;
}

function Scene({ isolated, parts, selected }: { isolated: boolean; parts: readonly Part[]; selected: string[] }) {
  const content = useRef<Group>(null);
  useLayoutEffect(() => { if (!content.current) return; const bounds = new Box3().setFromObject(content.current); const size = bounds.getSize(new Vector3()); const center = bounds.getCenter(new Vector3()); const scale = 4 / Math.max(size.x, size.y, size.z, 0.001); content.current.scale.setScalar(scale); content.current.position.copy(center.multiplyScalar(-scale)); }, []);
  return <group ref={content}>{parts.map((part) => <PartMesh key={part.id} part={part} selected={selected.includes(part.id)} isolated={isolated} />)}</group>;
}

export function RegionModelViewer({ region }: { region: RegionKey }) {
  const config = regionalModels[region];
  const [selected, setSelected] = useState<string[]>(config.parts.map((part) => part.id));
  const [isolated, setIsolated] = useState(false);
  const restore = () => { setSelected(config.parts.map((part) => part.id)); setIsolated(false); };
  return <section className="region-viewer-shell" aria-label={`Interactive segmented ${config.title.toLowerCase()} model`}><div className="region-viewer-copy"><p className="atelier-kicker">Regional model · {config.title}</p><h1>{config.title}, in connected layers.</h1><p>{config.description} Select structures to keep in view, then isolate them to remove surrounding anatomy completely.</p><div className="region-part-controls" aria-label={`${config.title} structure controls`}>{config.parts.map((part) => <button key={part.id} className={selected.includes(part.id) ? "active" : ""} onClick={() => setSelected((current) => current.includes(part.id) ? current.filter((id) => id !== part.id) : [...current, part.id])} aria-pressed={selected.includes(part.id)}><i style={{ background: part.color }} />{part.label}</button>)}</div><p className="region-selection-status" aria-live="polite"><b>{selected.length}</b> of {config.parts.length} structures selected{isolated ? " · surrounding structures hidden" : " · surrounding structures faded"}</p><div className="region-actions"><button onClick={() => setIsolated((value) => !value)} aria-pressed={isolated}>{isolated ? "Show surrounding structures" : "Isolate selected structures"}</button><button onClick={restore}>Restore region</button></div><p className="region-attribution">Model derived from <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noreferrer">BodyParts3D, DBCLS</a> · CC BY-SA 2.1 JP.</p></div><div className="region-canvas-wrap"><Canvas camera={{ position: [0, .4, 8], fov: 35 }} dpr={[1, 1.35]} gl={{ powerPreference: "high-performance" }}><color attach="background" args={["#fcf7f0"]} /><ambientLight intensity={1.8} /><directionalLight intensity={2.2} position={[5, 7, 5]} /><Suspense fallback={null}><Scene parts={config.parts} selected={selected} isolated={isolated} /></Suspense><OrbitControls enableDamping /></Canvas></div></section>;
}
