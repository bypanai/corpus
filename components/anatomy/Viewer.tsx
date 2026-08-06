"use client";

import { Html, PerformanceMonitor, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Expand, EyeOff, Focus, RotateCcw, ScanSearch, Tag } from "lucide-react";
import { forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Plane, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ViewerCamera } from "./ViewerCamera";
import { AnatomyModel } from "./HeartModel";
import type { AnatomyOrgan } from "./organ-data";
import { ViewerLights } from "./ViewerLights";
import type { AnatomyViewerHandle, FocusMode, StructureSelection, ViewerAction } from "./types";

const HOME_CAMERA: [number, number, number] = [0, 1.05, 8.2];

type RenderQuality = { dpr: number; tier: "high" | "balanced" | "performance" };
type SectionAxis = "axial" | "coronal" | "sagittal";

const QUALITY_TIERS: RenderQuality[] = [
  { tier: "high", dpr: 1.5 },
  { tier: "balanced", dpr: 1.25 },
  { tier: "performance", dpr: 1 },
];

function ModelLoader({ organName }: { organName: string }) {
  return <Html center><div aria-live="polite" className="rounded-2xl border border-[#b88c76]/25 bg-[#fffaf4]/95 px-5 py-4 text-center shadow-[0_14px_30px_rgba(87,62,43,.12)]"><span className="mx-auto mb-2 block h-5 w-5 animate-pulse rounded-full bg-[#ee7c6a]" /><b className="block font-[family-name:var(--font-serif)] text-lg text-[#473b35]">Loading {organName.toLowerCase()}</b><span className="mt-1 block text-xs text-[#75685e]">Preparing the interactive specimen</span></div></Html>;
}

export const Viewer = forwardRef<AnatomyViewerHandle, { activeHotspotId?: string | null; relatedHotspotIds?: string[]; organ: AnatomyOrgan; onStructureSelect?: (selection: StructureSelection | null) => void }>(function Viewer({ activeHotspotId, relatedHotspotIds, organ, onStructureSelect }, ref) {
  const shellRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [resetToken, setResetToken] = useState(0);
  const [focusMode, setFocusMode] = useState<FocusMode>("normal");
  const [canIsolate, setCanIsolate] = useState(false);
  const [status, setStatus] = useState("Auto-rotation is on.");
  const [renderQuality, setRenderQuality] = useState<RenderQuality>(QUALITY_TIERS[0]);
  const [sectionAxis, setSectionAxis] = useState<SectionAxis | null>(null);
  const [sectionPosition, setSectionPosition] = useState(0);
  const runRef = useRef<(action: ViewerAction) => void>(() => undefined);
  const hasLabels = organ.hotspots.length > 0;

  const resetView = () => {
    controlsRef.current?.reset();
    controlsRef.current?.object.position.set(...HOME_CAMERA);
    controlsRef.current?.target.set(0, 0.02, 0);
    controlsRef.current?.update();
    setResetToken((token) => token + 1);
    setFocusMode("normal");
    setSectionAxis(null);
    setSectionPosition(0);
    setCanIsolate(false);
    setStatus("View and selection reset.");
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await shellRef.current?.requestFullscreen?.();
    } catch {
      setStatus("Fullscreen is not available in this browser.");
    }
  };

  const run = (action: ViewerAction) => {
    if (action === "reset") return resetView();
    if (action === "toggle-auto-rotate") {
      setAutoRotate((value) => {
        setStatus(value ? "Auto-rotation paused." : "Auto-rotation on.");
        return !value;
      });
    }
    if (action === "toggle-labels") {
      if (!hasLabels) return setStatus(`Named reference points are not available for the ${organ.name.toLowerCase()} yet.`);
      setShowLabels((value) => {
        setStatus(value ? "Reference labels hidden." : "Reference labels shown.");
        return !value;
      });
    }
    if (action === "toggle-fullscreen") void toggleFullscreen();
    if (action === "toggle-fade") {
      setFocusMode((mode) => {
        const next = mode === "fade" ? "normal" : "fade";
        setStatus(next === "fade" ? "Specimen faded so reference points stand out." : "Full specimen restored.");
        return next;
      });
    }
    if (action === "toggle-isolate") {
      if (!canIsolate) return setStatus("Select a model surface before isolating it.");
      setFocusMode((mode) => {
        const next = mode === "isolate" ? "normal" : "isolate";
        setStatus(next === "isolate" ? "Selected model surface isolated." : "Full specimen restored.");
        return next;
      });
    }
  };

  const handleStructureSelection = (selection: StructureSelection | null) => {
    setCanIsolate(selection?.source === "model");
    if (selection?.source !== "model" && focusMode === "isolate") setFocusMode("normal");
    onStructureSelect?.(selection);
  };

  const lowerRenderQuality = () => {
    setRenderQuality((current) => QUALITY_TIERS[Math.min(QUALITY_TIERS.findIndex((tier) => tier.tier === current.tier) + 1, QUALITY_TIERS.length - 1)]);
  };

  const raiseRenderQuality = () => {
    setRenderQuality((current) => QUALITY_TIERS[Math.max(QUALITY_TIERS.findIndex((tier) => tier.tier === current.tier) - 1, 0)]);
  };

  const clippingPlane = sectionAxis ? new Plane(sectionAxis === "axial" ? new Vector3(0, 1, 0) : sectionAxis === "coronal" ? new Vector3(0, 0, 1) : new Vector3(1, 0, 0), sectionPosition) : null;

  useEffect(() => {
    const updateFullscreenState = () => setIsFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  useEffect(() => {
    runRef.current = run;
  });

  useEffect(() => {
    const runRequestedAction = (event: Event) => runRef.current((event as CustomEvent<ViewerAction>).detail);
    window.addEventListener("corpus:viewer-action", runRequestedAction);
    return () => window.removeEventListener("corpus:viewer-action", runRequestedAction);
  }, []);

  useImperativeHandle(ref, () => ({ run }));

  return (
    <section ref={shellRef} className="anatomy-viewer" aria-describedby="viewer-accessible-summary" aria-label={`${organ.name} interactive viewer`}>
      <p className="sr-only" id="viewer-accessible-summary">Interactive three-dimensional model of the {organ.name}. Use the labelled viewer controls and the anatomy information panel to explore available reference points, facts, and relationships.</p>
      <div className="viewer-glow" />
      <Canvas style={{ inset: 0, position: "absolute" }} shadows={renderQuality.tier !== "performance" ? "basic" : false} dpr={renderQuality.dpr} gl={{ alpha: true, antialias: true, powerPreference: "high-performance", localClippingEnabled: true }}>
        <color attach="background" args={["#faf4ec"]} />
        <PerformanceMonitor flipflops={3} onDecline={lowerRenderQuality} onIncline={raiseRenderQuality} />
        <PerspectiveCamera makeDefault fov={34} position={HOME_CAMERA} />
        <ViewerLights />
        <Suspense fallback={<ModelLoader organName={organ.name} />}>
          <AnatomyModel key={`${organ.id}-${resetToken}`} activeHotspotId={activeHotspotId} clippingPlane={clippingPlane} focusMode={focusMode} relatedHotspotIds={relatedHotspotIds} organ={organ} autoRotate={autoRotate} showLabels={showLabels} onStructureSelect={handleStructureSelection} />
        </Suspense>
        <mesh receiveShadow position={[0, -2.5, 0]}><cylinderGeometry args={[2.3, 2.48, 0.34, 56]} /><meshStandardMaterial color="#e8d6c3" roughness={0.78} /></mesh>
        <ViewerCamera controlsRef={controlsRef} onStart={() => { if (autoRotate) { setAutoRotate(false); setStatus("Auto-rotation paused while you explore."); } }} />
      </Canvas>
      <div className="viewer-tools" aria-label="3D viewer tools">
        <ViewerButton accessibleLabel={autoRotate ? "Pause auto-rotation" : "Start auto-rotation"} active={autoRotate} label="Rotate" onClick={() => run("toggle-auto-rotate")}><RotateCcw size={18} /></ViewerButton>
        <ViewerButton accessibleLabel={hasLabels ? "Toggle reference labels" : `No reference labels available for ${organ.name}`} active={showLabels} disabled={!hasLabels} label="Labels" onClick={() => run("toggle-labels")}><Tag size={18} /></ViewerButton>
        <ViewerButton accessibleLabel={focusMode === "fade" ? "Restore specimen opacity" : "Fade specimen to emphasise reference points"} active={focusMode === "fade"} label="Fade" onClick={() => run("toggle-fade")}><EyeOff size={18} /></ViewerButton>
        <ViewerButton accessibleLabel={canIsolate ? (focusMode === "isolate" ? "Restore full specimen" : "Isolate selected model surface") : "Select a model surface to enable isolate"} active={focusMode === "isolate"} disabled={!canIsolate} label="Isolate" onClick={() => run("toggle-isolate")}><Focus size={18} /></ViewerButton>
        <ViewerButton accessibleLabel={sectionAxis ? "Close cross-section controls" : "Open cross-section controls"} active={Boolean(sectionAxis)} label="Section" onClick={() => setSectionAxis((axis) => axis ? null : "axial")}><ScanSearch size={18} /></ViewerButton>
        <ViewerButton accessibleLabel="Reset camera, model orientation, and selection" label="Reset" onClick={() => run("reset")}><ScanSearch size={18} /></ViewerButton>
        <ViewerButton accessibleLabel={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"} active={isFullscreen} label="Fullscreen" onClick={() => run("toggle-fullscreen")}><Expand size={18} /></ViewerButton>
      </div>
      {sectionAxis && <div className="viewer-section-panel" aria-label="Cross-section controls">
        <div><b>Cross-section</b><button onClick={() => setSectionAxis(null)} aria-label="Close cross-section controls">×</button></div>
        <p>Move the plane through the model. This is an educational 3D cut, not a diagnostic image.</p>
        <div className="viewer-section-axes" role="group" aria-label="Cross-section orientation">
          {(["axial", "coronal", "sagittal"] as SectionAxis[]).map((axis) => <button key={axis} className={sectionAxis === axis ? "active" : ""} onClick={() => setSectionAxis(axis)} aria-pressed={sectionAxis === axis}>{axis}</button>)}
        </div>
        <label>Plane position <input aria-label="Cross-section plane position" type="range" min="-2" max="2" step="0.02" value={sectionPosition} onChange={(event) => setSectionPosition(Number(event.target.value))} /></label>
      </div>}
      <div className="viewer-caption"><span>Interactive 3D specimen</span><strong>{organ.name}</strong></div>
      <p aria-live="polite" className="viewer-status" role="status">{status}</p>
      <button className="auto-rotate" type="button" onClick={() => run("toggle-auto-rotate")} aria-pressed={autoRotate}><RotateCcw size={14} /> Auto rotate <i className={autoRotate ? "on" : ""} /></button>
    </section>
  );
});

function ViewerButton({ accessibleLabel, active = false, children, disabled = false, label, onClick }: { accessibleLabel: string; active?: boolean; children: React.ReactNode; disabled?: boolean; label: string; onClick: () => void }) {
  return <button aria-label={accessibleLabel} aria-pressed={active} className={active ? "active" : ""} disabled={disabled} onClick={onClick} title={accessibleLabel} type="button"><span>{children}</span><small>{label}</small></button>;
}
