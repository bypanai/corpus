# Corpus Anatomy Platform

## Product intent

Corpus is a free, open-source visual anatomy explorer. Its purpose is spatial understanding of the human body through responsive, beautiful 3D models—not exam preparation, flashcards, advertising, or subscriptions.

The product should feel calm and obvious on first use: search or choose a structure, inspect it in 3D, reveal its relationships, and read a concise explanation when it is useful.

## People it serves

- Learners beginning anatomy, who need clear orientation and plain-language explanations.
- Clinicians, therapists, and educators, who need fast structure, region, and system reference.
- Accessible-learning users, who need keyboard access, readable text, reduced motion, and non-colour-only cues.

## Experience principles

1. One visual task at a time: the model is always the centre of attention.
2. Controls are direct manipulation: rotate, pan, zoom, isolate, fade, and reset.
3. Search responds immediately, highlights the matching structure, and never buries results.
4. Information is progressive: a short definition first, with deeper clinical relationships available on demand.
5. Every asset and anatomical fact has a recorded source and licence.

## Release sequence

### Foundation — in progress

- Premium, distraction-free explorer layout and responsive controls.
- Searchable organ library with nine shipped, locally hosted GLB models.
- Model selection, automatic framing, lighting, rotate/zoom/pan, labels where anatomical hotspots are available, and concise facts.

### Explorer MVP

- Male and female full-body model, with system and region navigation.
- Structure-level identifiers, hover/select highlight, isolation, visibility, opacity, and reset.
- Pinned and hover labels; anatomy information for each selectable structure.
- Keyboard shortcuts, light/dark themes, text sizing, reduced-motion support, and mobile gestures.

### Spatial relationships

- Layer explorer: skin, fascia, muscles, vessels, nerves, and bones.
- Multi-select structures and saved views.
- Region focus (head, neck, thorax, abdomen, pelvis, back, upper limb, lower limb).
- Axial, coronal, and sagittal clipping planes with an adjustable slice position.

### Open platform

- Curated anatomical content workflow and visible provenance.
- Optional accounts for bookmarks and notes; browsing remains usable without an account.
- Offline cache for the application shell and recently used, versioned models.

## Information standard

Each structure record supports: canonical anatomical name, common name, concise description, function, location, origin, insertion, arterial supply, innervation, relations, clinical significance, normal variations, citations, and review status. Fields that do not apply remain absent rather than guessed.

Medical information must be reviewed against named primary or authoritative anatomy sources before it is presented as clinical guidance.

## Asset and licence policy

Only models, illustrations, textures, and text that are redistributable under a compatible open licence may ship. The repository must retain original attribution, licence text, modification notes, and source URL for every asset. Do not extract models or copy explanatory material from commercial anatomy products.

Before adopting an anatomy dataset, confirm that it permits web redistribution, modification, and the intended licence of Corpus. This verification is a release gate, not a checkbox.

## Success measures

- A new visitor can find and frame a structure in under 20 seconds.
- The initial interactive view remains usable on current desktop and tablet browsers.
- Core scene interactions remain smooth on representative mid-range hardware.
- Keyboard-only users can choose a model, operate controls, and read the information panel.
- Every released asset and content record is traceable to a licence and source.
