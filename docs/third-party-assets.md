# Third-party anatomy assets

## BodyParts3D 4.0

Corpus regional models derived from the **BodyParts3D** database are used under
[Creative Commons Attribution-ShareAlike 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en).

- Source: [BodyParts3D download archive](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html)
- Provider: Database Center for Life Science, Japan
- Attribution: “BodyParts3D, DBCLS”
- License requirement: derivative assets retain attribution and use the same license.

The project stores only processed regional viewer assets required by the application. The source archive is not bundled in the repository.

See `docs/anatomy-asset-register.md` for the exact shipped regional files, their interaction scope, and the staged review process for future replacements.

## Primary organ reference specimens

The nine files in `public/models/*.glb` are currently used only as whole-organ reference specimens with curated display overlays. Their source and redistribution licence have not yet been independently documented in this repository. They must not be represented as segmented anatomical datasets, and their provenance must be verified or the files replaced before the next public production release.
