# Anatomy viewer migration plan

## Source map

The uploaded `anatomy-main.zip` is a Next.js/Vinext app. Its viewer is plain Three.js, not React Three Fiber.

| Source responsibility | Source file | Corpus destination |
| --- | --- | --- |
| Application state, search, organ selection | `app/components/AnatomyApp.tsx` | `features/anatomy/AnatomyWorkspace.tsx` |
| Viewer controls and HTML callout | `app/components/OrganViewer.tsx` | `components/anatomy/Viewer.tsx` and `ViewerToolbar.tsx` |
| Renderer, camera, controls, performance loop | `app/lib/three/viewer.ts` | R3F scene components and `useAnatomyViewer` |
| GLB cache and normalization | `app/lib/three/loaders.ts` | `lib/anatomy/model-loader.ts` |
| GPU hotspot layer and ray picking | `app/lib/three/hotspots.ts` | `components/anatomy/Hotspots.tsx` |
| Organ content and hotspot coordinates | `app/lib/anatomy-data.ts` | `features/anatomy/data/organs.ts` |
| GLB, decoder, and illustration assets | `public/models`, `public/anatomy`, `public/basis`, `public/draco` | same paths under Corpus `public/` |

## Existing rendering pipeline

1. `AnatomyApp` filters the organ list by name/system and selects an organ.
2. `OrganViewer` dynamically creates an imperative `AnatomyViewer` after the browser mount.
3. `AnatomyViewer` creates the WebGL renderer, a 34° perspective camera, damped `OrbitControls`, warm/cool lighting, plinth, contact-shadow texture, and particles.
4. `AnatomyAssetManager` loads a GLB with Meshopt support, scales it into a 3.8-unit cube, centres it, tunes materials, and keeps the three most recent models in memory.
5. `HotspotLayer` projects authored coordinates into the scene, performs pointer picking, and positions a DOM callout without rerendering React every frame.
6. Viewer tools reset camera, toggle auto-rotate, zoom, isolate, apply a clipping plane, switch wireframe layers, and compare organs.

## Migration increments

1. **Viewer foundation — complete.** Modular R3F canvas, camera controls, lighting, safe labels, and browser controls with a specimen placeholder.
2. **Asset loader.** Copy the supplied GLB and decoder assets, add normalized `useGLTF` loading and a canvas-safe loading/error state. Start with heart only.
3. **Organ registry + search.** Move organ metadata into a Corpus data module; render a searchable organ library and switch models without rebuilding the canvas.
4. **Selection + hotspots.** Convert source hotspot coordinates into R3F markers, raycast on click, and render accessible DOM callouts outside the canvas.
5. **Advanced tools.** Port reset, auto-rotate, zoom, isolate, clipping, and wireframe one at a time; retain only controls that serve the Corpus learning flow.
6. **Learning workspace.** Migrate the facts panel, compare view, notes/bookmarks, and lessons as independent feature components.
7. **Performance and QA.** Add prefetching, asset disposal/cache policy, reduced mobile DPR, keyboard coverage, and route-level visual tests.

## Guardrails

- HTML may appear in the scene only via Drei's `Html` component. The original Corpus crash came from rendering an ordinary `<div>` inside `Canvas`.
- Keep each interactive browser-only unit behind a small `"use client"` boundary; pages and static anatomy data remain server-compatible.
- Do not copy the source viewer wholesale: its imperative renderer lifecycle duplicates React Three Fiber responsibilities.
- Preserve attribution and verify licence/redistribution terms for every copied GLB and illustration asset before deployment.
