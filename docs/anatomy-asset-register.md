# Anatomy asset register

This register is the release gate for every 3D asset shipped by Corpus. A model may enter a public build only when its file, source, licence, attribution, anatomical scope, and review status are recorded here.

## Licensed segmented regional assets — approved

Source: [BodyParts3D 4.0 download archive](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html)  
Attribution: `BodyParts3D, DBCLS`  
Licence: [CC BY-SA 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en)  
Use: independently controlled regional structures. Derived works must preserve attribution and the share-alike licence.

| Region | Shipped files | Interaction status |
| --- | --- | --- |
| Thorax | `rib-cage`, `heart`, `left-lung`, `right-lung`, `trachea` | Segmented; show/hide/isolate supported |
| Abdomen | `liver`, `pancreas`, `right-kidney`, `left-kidney`, `small-intestine`, `colon` | Segmented; show/hide supported |
| Head and neck | `head`, `neck` | Segmented at regional level; further structure mapping pending |
| Limbs | `right-upper-limb`, `left-upper-limb`, `lower-limbs` | Segmented at regional level; further structure mapping pending |

## Whole-organ reference specimens — blocked for replacement

The nine `public/models/*.glb` files are visually useful whole-organ reference specimens only. They are one-mesh assets, contain no anatomical object hierarchy, and have no recorded redistribution provenance. They must not be used for structure selection, layer controls, or future public releases until their provenance is verified or they are replaced.

## Candidate replacement source — needs staged technical review

**Z-Anatomy, Models of Human Anatomy**  
Source: [Z-Anatomy GitHub repository](https://github.com/Z-Anatomy/Models-of-human-anatomy)  
Licence: CC BY-SA 4.0 International  
Required attribution: `Z-Anatomy — The libre 3D atlas of anatomy — CC BY-SA 4.0`, plus the upstream `BodyParts3D — The Database Center for Life Science — CC BY-SA 2.1 Japan` attribution where applicable.

Before importing any Z-Anatomy model:

1. Inspect its object hierarchy and confirm each intended selectable structure is a separate object.
2. Exclude any included asset with a non-commercial or incompatible third-party licence.
3. Convert only the necessary region to compressed GLB, retaining structure IDs in a manifest.
4. Perform visual anatomical review and interaction testing.
5. Add a per-file entry to this register, `docs/third-party-assets.md`, and the in-app attribution UI.

### Head-and-neck import boundary

Do not import the Z-Anatomy inner-ear asset: its upstream attribution identifies it as CC BY-NC-SA 4.0, which is not compatible with Corpus's unrestricted free public use. Likewise, do not import the included kidney asset identified as CC BY-NC 4.0. Treat all other head-and-neck objects as individually pending until their hierarchy and upstream attribution are checked.

## Replacement sequence

1. Thorax: use the already-approved BodyParts3D route as the immediate truthful experience.
2. Abdomen: promote existing individually controlled liver, pancreas, kidneys, intestine, and colon assets after each structure is visually reviewed.
3. Head/neck and limbs: refine into additional structures only from approved sources.
4. Add any Z-Anatomy assets only after the staged review above; never bulk-import the repository.
