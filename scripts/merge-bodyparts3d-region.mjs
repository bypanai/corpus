#!/usr/bin/env node

/**
 * Combines selected BodyParts3D OBJ fragments into a single OBJ with named groups.
 *
 * Usage:
 * node scripts/merge-bodyparts3d-region.mjs <source-dir> <output.obj>
 *
 * Name input files as `<group>-<BodyParts3D-id>.obj`, e.g. `heart-FJ1234.obj`.
 * The original archive stays outside the web application; this generates its
 * small, lazy-loaded derivative asset.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function reindexFace(face, vertexOffset, textureOffset, normalOffset) {
  return face.split(" ").map((token) => {
    const parts = token.split("/");
    const add = (value, offset) => (value ? String(Number(value) + offset) : value);
    parts[0] = add(parts[0], vertexOffset);
    if (parts.length > 1) parts[1] = add(parts[1], textureOffset);
    if (parts.length > 2) parts[2] = add(parts[2], normalOffset);
    return parts.join("/");
  }).join(" ");
}

async function main() {
  const [sourceDir, outputPath] = process.argv.slice(2);
  if (!sourceDir || !outputPath) throw new Error("Usage: node scripts/merge-bodyparts3d-region.mjs <source-dir> <output.obj>");

  const sourceFiles = (await readdir(sourceDir)).filter((file) => file.endsWith(".obj")).sort();
  const byGroup = new Map();
  for (const file of sourceFiles) {
    const separator = file.indexOf("-");
    if (separator < 1) throw new Error(`Expected <group>-<id>.obj, received ${file}`);
    const group = file.slice(0, separator);
    byGroup.set(group, [...(byGroup.get(group) ?? []), file]);
  }

  const output = ["# Corpus regional model — derived from BodyParts3D 4.0", "# CC BY-SA 2.1 JP; see docs/third-party-assets.md"];
  let vertexOffset = 0; let textureOffset = 0; let normalOffset = 0;

  for (const [group, files] of byGroup) {
    output.push(`g ${group}`);
    for (const file of files) {
      const lines = (await readFile(path.join(sourceDir, file), "utf8")).split(/\r?\n/);
      for (const line of lines) {
        if (line.startsWith("v ") || line.startsWith("vt ") || line.startsWith("vn ")) output.push(line);
        else if (line.startsWith("f ")) output.push(`f ${reindexFace(line.slice(2), vertexOffset, textureOffset, normalOffset)}`);
      }
      vertexOffset += lines.filter((line) => line.startsWith("v ")).length;
      textureOffset += lines.filter((line) => line.startsWith("vt ")).length;
      normalOffset += lines.filter((line) => line.startsWith("vn ")).length;
    }
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${output.join("\n")}\n`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
