"use client";

import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { Box3, Color, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const PARTS = [
  { id: "rib-cage", label: "Rib cage", color: "#d6c2a6" },
  { id: "heart", label: "Heart", color: "#b94e51" },
  { id: "left-lung", label: "Left bronchial tree", color: "#c98388" },
  { id: "right-lung", label: "Right bronchial tree", color: "#c98388" },
  { id: "trachea", label: "Trachea", color: "#d9bd98" },
] as const;

type PartId = (typeof PARTS)[number]["id"];

function ThoraxPart({ part, enabled, isolated }: { part: (typeof PARTS)[number]; enabled: boolean; isolated: boolean }) {
  const { scene } = useGLTF(`/models/regions/${part.id}.glb`, false, false, (loader) => loader.setMeshoptDecoder(MeshoptDecoder));
  const model = useMemo(() => scene.clone(true), [scene]);
  useLayoutEffect(() => {
    model.traverse((node) => {
      if (!(node as Mesh).isMesh) return;
      const mesh = node as Mesh;
      mesh.visible = isolated ? enabled : true;
      mesh.material = new MeshStandardMaterial({ color: new Color(part.color), roughness: 0.58, metalness: 0.02, transparent: !enabled, opacity: enabled ? 1 : 0.12, depthWrite: enabled });
    });
  }, [enabled, isolated, model, part.color]);
  return <primitive object={model} />;
}

function ThoraxModel({ visibleParts, isolated }: { visibleParts: PartId[]; isolated: boolean }) {
  const pivot = useRef<Group>(null);
  const content = useRef<Group>(null);
  useLayoutEffect(() => {
    if (!content.current) return;
    const bounds = new Box3().setFromObject(content.current);
    const size = bounds.getSize(new Vector3());
    const centre = bounds.getCenter(new Vector3());
    const scale = 4.2 / Math.max(size.x, size.y, size.z, 0.001);
    content.current.scale.setScalar(scale);
    content.current.position.copy(centre.multiplyScalar(-scale));
  }, []);
  useFrame((_, delta) => { if (pivot.current) pivot.current.rotation.y += delta * 0.08; });
  return <group ref={pivot} rotation={[0.06, -0.18, 0]}><group ref={content}>{PARTS.map((part) => <ThoraxPart key={part.id} part={part} enabled={visibleParts.includes(part.id)} isolated={isolated} />)}</group></group>;
}

function Loader() {
  return <Html center><span className="rounded-full border border-stone-300 bg-white/90 px-3 py-2 text-sm text-stone-700">Loading regional model…</span></Html>;
}

export function ThoraxRegionViewer() {
  const [visibleParts, setVisibleParts] = useState<PartId[]>(PARTS.map((part) => part.id));
  const [isolated, setIsolated] = useState(false);
  const [quality, setQuality] = useState<"high" | "balanced" | "performance">("high");
  const dpr = quality === "high" ? 1.5 : quality === "balanced" ? 1.25 : 1;
  useEffect(() => {
    const timer = window.setTimeout(() => setQuality("balanced"), 7500);
    return () => window.clearTimeout(timer);
  }, []);
  const togglePart = (part: PartId) => setVisibleParts((current) => current.includes(part) ? current.filter((id) => id !== part) : [...current, part]);
  const restore = () => { setVisibleParts(PARTS.map((part) => part.id)); setIsolated(false); };
  const visibleCount = visibleParts.length;

  return <section className="region-viewer-shell" aria-label="Interactive segmented thorax model">
    <div className="region-viewer-copy">
      <p className="atelier-kicker">Regional model · thorax</p>
      <h1>See the chest as connected structures.</h1>
      <p>A segmented thorax systems model with independently controlled rib cage, heart, bronchial trees and trachea. Rotate, zoom, hide surrounding structures, then isolate the selection to understand their spatial relationship.</p>
      <div className="region-part-controls" aria-label="Thorax structure controls">
        {PARTS.map((part) => <button key={part.id} className={visibleParts.includes(part.id) ? "active" : ""} onClick={() => togglePart(part.id)} aria-pressed={visibleParts.includes(part.id)}><i style={{ background: part.color }} />{part.label}</button>)}
      </div>
      <p className="region-selection-status" aria-live="polite"><b>{visibleCount}</b> of {PARTS.length} structures selected{isolated ? " · surrounding structures hidden" : " · surrounding structures faded"}</p>
      <div className="region-actions"><button onClick={() => setIsolated((value) => !value)} aria-pressed={isolated}>{isolated ? "Show surrounding structures" : "Isolate selected structures"}</button><button onClick={restore}>Restore thorax</button></div>
      <p className="region-attribution">Model derived from <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noreferrer">BodyParts3D, DBCLS</a> · CC BY-SA 2.1 JP.</p>
    </div>
    <div className="region-canvas-wrap">
      <span className="viewer-quality">Adaptive quality · {quality}</span>
      <Canvas dpr={dpr} shadows={quality !== "performance"} camera={{ position: [0, 0.5, 8], fov: 35 }} gl={{ antialias: quality !== "performance", powerPreference: "high-performance" }}>
        <color attach="background" args={["#fcf7f0"]} />
        <ambientLight intensity={1.8} />
        <directionalLight castShadow={quality === "high"} intensity={2.2} position={[5, 7, 5]} shadow-mapSize={[1024, 1024]} />
        <directionalLight intensity={0.7} position={[-5, 2, -4]} />
        <Suspense fallback={<Loader />}><ThoraxModel visibleParts={visibleParts} isolated={isolated} /></Suspense>
        <OrbitControls enableDamping dampingFactor={0.06} minDistance={4.5} maxDistance={11} target={[0, 0, 0]} />
      </Canvas>
      <p className="region-viewer-caption">Rib cage · heart · airways</p>
    </div>
  </section>;
}

PARTS.forEach((part) => useGLTF.preload(`/models/regions/${part.id}.glb`, false, false, (loader) => loader.setMeshoptDecoder(MeshoptDecoder)));
