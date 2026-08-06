"use client";

import { useSearchParams } from "next/navigation";
import { AnatomyWorkspace } from "./AnatomyWorkspace";
import { organs, type AnatomyOrgan } from "./organ-data";

export function AnatomyRouteClient() {
  const searchParams = useSearchParams();
  const requestedOrgan = searchParams.get("organ");
  const initialOrganId = organs.some((organ) => organ.id === requestedOrgan) ? requestedOrgan as AnatomyOrgan["id"] : "heart";
  const requestedMode = searchParams.get("mode");
  const initialExperience = requestedMode === "guide" || requestedMode === "story" ? requestedMode : undefined;
  const initialLandmarkId = searchParams.get("landmark") ?? undefined;
  const initialStoryStep = Number(searchParams.get("step"));
  const initialRelationshipFromId = searchParams.get("from") ?? undefined;
  const initialRelationshipToId = searchParams.get("to") ?? undefined;

  return <AnatomyWorkspace key={`${initialOrganId}-${initialExperience ?? "explore"}-${initialLandmarkId ?? ""}-${initialStoryStep ?? ""}-${initialRelationshipFromId ?? ""}-${initialRelationshipToId ?? ""}`} initialExperience={initialExperience} initialLandmarkId={initialLandmarkId} initialOrganId={initialOrganId} initialRelationshipFromId={initialRelationshipFromId} initialRelationshipToId={initialRelationshipToId} initialStoryStep={Number.isFinite(initialStoryStep) ? initialStoryStep : undefined} />;
}
