# Corpus Anatomy Architecture

## Frontend shape

```text
app/anatomy/page.tsx
  AnatomyWorkspace
    Organ library + search
    Viewer
      React Three Fiber Canvas
      ViewerCamera / ViewerLights
      AnatomyModel (GLB loader, normalizer, hotspots)
    Information panel

components/anatomy/organ-data.ts
  presentation metadata + verified hotspot positions
public/models/
  versioned GLB assets
public/anatomy/
  licensed illustrations and thumbnails
```

The current viewer keeps rendering concerns separate from UI state. `AnatomyWorkspace` owns the selected structure and passes a typed `AnatomyOrgan` into `Viewer`. The viewer owns WebGL resources, camera controls, model normalization, and scene interaction. This prevents page-level UI changes from becoming a 3D rewrite.

## Data model (future server-backed catalogue)

```text
anatomical_structures
  id, canonical_name, common_name, system, region, sex_variant,
  description, function, location, clinical_significance, review_status

structure_relations
  structure_id, related_structure_id, relation_type

structure_details
  structure_id, detail_type, content, source_id

model_assets
  id, structure_id, url, format, version, lod, checksum,
  licence, attribution, source_url

model_nodes
  asset_id, node_name, structure_id, label_anchor_x, label_anchor_y, label_anchor_z

sources
  id, citation, url, licence, accessed_at

user_saved_views (optional account feature)
  user_id, name, camera_state, visibility_state, selected_structure_id
```

PostgreSQL is appropriate once the catalogue needs editorial review, relations, and accounts. Use migrations (Prisma or Drizzle) and keep stable public structure IDs independent of mesh node names.

## API outline

- `GET /api/anatomy/search?q=`: ranked structure summaries.
- `GET /api/anatomy/structures/:id`: reviewed information and citations.
- `GET /api/anatomy/structures/:id/model`: signed or static asset manifest, including LOD variants.
- `GET /api/anatomy/regions/:region`: region hierarchy and structure IDs.
- `POST /api/saved-views`: authenticated optional saved camera/layer state.

Static GLB files should be immutable, content-hashed, cacheable assets served from the application CDN or a compatible object store. API responses should be cached independently from model binaries.

## Performance plan

- Preserve GLB mesh compression and decode with Meshopt where available.
- Generate LOD variants; do not send a full-body highest-detail model to every device.
- Lazy-load each model after the user selects it; preload only the likely next choice.
- Dispose unused GPU resources deliberately and reuse material/geometry when switching nodes inside a shared asset.
- Limit device pixel ratio, pause continuous animation when off-screen or reduced motion is requested, and monitor frame time.
- Use a loading boundary, an accessible progress announcement, and a graceful illustration fallback when WebGL is unavailable.

## Testing strategy

- Unit tests: organ catalogue validation, search ranking, visibility/layer state, and content schema.
- Component tests: keyboard navigation, control labels, details-panel updates, and no-result search.
- End-to-end tests: select each shipped model, verify the canvas loads, select a hotspot, reset camera, and test a narrow viewport.
- Visual regression: capture the anatomy workspace in light/dark modes at desktop, tablet, and phone widths.
- 3D checks: asset manifest validation, mesh/node naming validation, model bounds, performance budgets, and licence metadata required in CI.

## Deployment guide

1. Run lint, type/build checks, and model-manifest tests in CI.
2. Deploy the Next.js application to Vercel or a comparable free tier.
3. Deploy large, immutable static model assets to a CDN/object store with correct cache headers; keep a local-development copy in `public/models`.
4. Configure a PostgreSQL provider only when the reviewed content catalogue or optional accounts are enabled.
5. Publish licence and attribution files with the release, then monitor JavaScript errors, WebGL fallback rate, load time, and frame-time telemetry without collecting unnecessary personal data.
