"use client";

import { ArrowLeft, ArrowRight, BadgeCheck, Bookmark, BookOpen, Check, Compass, ExternalLink, GitCompareArrows, LibraryBig, Route, Search, Share2, Stethoscope, X, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type CSSProperties, type KeyboardEvent } from "react";
import { landmarkProfiles, organs, relationshipReferences, type AnatomyOrgan } from "./organ-data";
import type { StructureSelection, ViewerAction } from "./types";
import { Viewer } from "./Viewer";

type AnatomyBookmark = { href: string; label: string };

export function AnatomyWorkspace({ initialExperience, initialLandmarkId, initialOrganId = "heart", initialRelationshipFromId, initialRelationshipToId, initialStoryStep = 0 }: { initialExperience?: "guide" | "story"; initialLandmarkId?: string; initialOrganId?: AnatomyOrgan["id"]; initialRelationshipFromId?: string; initialRelationshipToId?: string; initialStoryStep?: number }) {
  const initialOrgan = organs.find((organ) => organ.id === initialOrganId) ?? organs[0];
  const initialHotspot = initialOrgan.hotspots.find((hotspot) => hotspot.id === initialLandmarkId) ?? initialOrgan.hotspots[0];
  const initialStoryHotspot = initialExperience === "story" ? initialOrgan.hotspots.find((hotspot) => hotspot.id === initialOrgan.stories[0]?.steps[initialStoryStep]?.hotspotId) ?? initialHotspot : initialHotspot;
  const initialRelationship = initialOrgan.relationships[0];
  const [query, setQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);
  const [libraryMode, setLibraryMode] = useState<"system" | "region">("system");
  const [libraryFilter, setLibraryFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<AnatomyOrgan["id"]>(initialOrgan.id);
  const [selectedStructure, setSelectedStructure] = useState<StructureSelection | null>(() => (initialExperience || initialLandmarkId) && initialStoryHotspot ? { id: initialStoryHotspot.id, name: initialStoryHotspot.label, detail: initialExperience === "story" ? initialOrgan.stories[0]?.steps[initialStoryStep]?.detail ?? initialStoryHotspot.detail : initialStoryHotspot.detail, source: "hotspot" } : null);
  const [guideActive, setGuideActive] = useState(initialExperience === "guide");
  const [guideIndex, setGuideIndex] = useState(0);
  const [showStructureDetails, setShowStructureDetails] = useState(false);
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [storyActive, setStoryActive] = useState(initialExperience === "story");
  const [storyIndex, setStoryIndex] = useState(initialStoryStep);
  const [focusedHotspotId, setFocusedHotspotId] = useState<string | null>(null);
  const [relationshipFromId, setRelationshipFromId] = useState(initialRelationshipFromId ?? initialRelationship?.fromId ?? initialHotspot?.id ?? "");
  const [relationshipToId, setRelationshipToId] = useState(initialRelationshipToId ?? initialRelationship?.toId ?? initialOrgan.hotspots[1]?.id ?? initialHotspot?.id ?? "");
  const [relationshipIntent, setRelationshipIntent] = useState(Boolean(initialRelationshipFromId && initialRelationshipToId));
  const [bookmarks, setBookmarks] = useState<AnatomyBookmark[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("corpus:bookmarks") ?? "[]"); } catch { return []; }
  });
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const libraryOptions = useMemo(() => ["All", ...Array.from(new Set(organs.flatMap((organ) => libraryMode === "system" ? (organ.systems ?? [organ.system]) : [organ.region])))], [libraryMode]);
  const visibleOrgans = useMemo(() => organs.filter((organ) => {
    const matchesSearch = `${organ.name} ${organ.system} ${organ.region}`.toLowerCase().includes(query.toLowerCase());
    const categories = libraryMode === "system" ? (organ.systems ?? [organ.system]) : [organ.region];
    return matchesSearch && (libraryFilter === "All" || categories.includes(libraryFilter));
  }), [libraryFilter, libraryMode, query]);
  const selectedOrgan = organs.find((organ) => organ.id === selectedId) ?? organs[0];
  const chooseOrgan = (id: AnatomyOrgan["id"]) => {
    setSelectedId(id);
    setSelectedStructure(null);
    setGuideActive(false);
    setGuideIndex(0);
    setShowStructureDetails(false);
    setShowAllFacts(false);
    setStoryActive(false);
    setStoryIndex(0);
    setFocusedHotspotId(null);
    const nextOrgan = organs.find((organ) => organ.id === id) ?? organs[0];
    setRelationshipFromId(nextOrgan.relationships[0]?.fromId ?? nextOrgan.hotspots[0]?.id ?? "");
    setRelationshipToId(nextOrgan.relationships[0]?.toId ?? nextOrgan.hotspots[1]?.id ?? nextOrgan.hotspots[0]?.id ?? "");
  };
  const searchOrgans = (value: string) => {
    setQuery(value);
    setCommandIndex(0);
    const matches = organs.filter((organ) => `${organ.name} ${organ.system}`.toLowerCase().includes(value.toLowerCase()));
    if (matches.length === 1) chooseOrgan(matches[0].id);
  };
  const changeLibraryMode = (mode: "system" | "region") => {
    setLibraryMode(mode);
    setLibraryFilter("All");
  };
  const guideHotspot = guideActive ? selectedOrgan.hotspots[guideIndex] : null;
  const activeStory = selectedOrgan.stories[0];
  const storyStep = storyActive ? activeStory?.steps[storyIndex] : null;
  const selectedProfile = selectedStructure?.source === "hotspot" && selectedStructure.id
    ? landmarkProfiles[`${selectedOrgan.id}.${selectedStructure.id}`]
    : null;
  const selectedRelationship = selectedOrgan.relationships.find((relationship) => (relationship.fromId === relationshipFromId && relationship.toId === relationshipToId) || (relationship.fromId === relationshipToId && relationship.toId === relationshipFromId));
  const selectedRelationshipReference = selectedRelationship ? relationshipReferences[selectedRelationship.sourceId ?? selectedOrgan.id] : null;
  const relationshipHotspotIds = relationshipFromId && relationshipToId ? [relationshipFromId, relationshipToId] : [];
  const chooseRelationshipSide = (side: "from" | "to", hotspotId: string) => {
    setRelationshipIntent(true);
    if (side === "from") setRelationshipFromId(hotspotId);
    else setRelationshipToId(hotspotId);
    const hotspot = selectedOrgan.hotspots.find((item) => item.id === hotspotId);
    if (hotspot) { setSelectedStructure({ id: hotspot.id, name: hotspot.label, detail: hotspot.detail, source: "hotspot" }); setFocusedHotspotId(hotspot.id); setGuideActive(false); setStoryActive(false); }
  };
  const shareState = useMemo(() => {
    const params = new URLSearchParams({ organ: selectedOrgan.id });
    let label = selectedOrgan.name;
    if (storyActive && storyStep) { params.set("mode", "story"); params.set("step", String(storyIndex)); label = `${selectedOrgan.name} · ${storyStep.title}`; }
    else if (relationshipIntent && relationshipFromId && relationshipToId) { params.set("from", relationshipFromId); params.set("to", relationshipToId); label = `${selectedOrgan.name} · relationship`; }
    else if (selectedStructure?.source === "hotspot" && selectedStructure.id) { params.set("landmark", selectedStructure.id); label = `${selectedOrgan.name} · ${selectedStructure.name}`; }
    return { href: `/anatomy?${params.toString()}`, label };
  }, [relationshipFromId, relationshipIntent, relationshipToId, selectedOrgan.id, selectedOrgan.name, selectedStructure, storyActive, storyIndex, storyStep]);
  const copyShareLink = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${shareState.href}`); setShareStatus("Link copied"); } catch { setShareStatus("Copy this link from the address bar"); }
  };
  const saveBookmark = () => {
    const next = [{ href: shareState.href, label: shareState.label }, ...bookmarks.filter((bookmark) => bookmark.href !== shareState.href)].slice(0, 12);
    setBookmarks(next); window.localStorage.setItem("corpus:bookmarks", JSON.stringify(next)); setShareStatus("Saved to bookmarks");
  };
  const selectGuideStep = (index: number) => {
    const hotspot = selectedOrgan.hotspots[index];
    if (!hotspot) return;
    setGuideActive(true);
    setStoryActive(false);
    setGuideIndex(index);
    setSelectedStructure({ id: hotspot.id, name: hotspot.label, detail: hotspot.detail, source: "hotspot" });
    setShowStructureDetails(false);
    setFocusedHotspotId(null);
  };
  const startGuide = () => selectGuideStep(0);
  const stopGuide = () => {
    setGuideActive(false);
    setSelectedStructure(null);
    setShowStructureDetails(false);
  };
  const selectStoryStep = (index: number) => {
    const step = activeStory?.steps[index];
    const hotspot = step && selectedOrgan.hotspots.find((item) => item.id === step.hotspotId);
    if (!step || !hotspot) return;
    setStoryActive(true);
    setStoryIndex(index);
    setGuideActive(false);
    setShowStructureDetails(false);
    setFocusedHotspotId(null);
    setSelectedStructure({ id: hotspot.id, name: hotspot.label, detail: step.detail, source: "hotspot" });
  };
  const stopStory = () => {
    setStoryActive(false);
    setSelectedStructure(null);
    setShowStructureDetails(false);
  };
  const handleStructureSelect = (selection: StructureSelection | null) => {
    setSelectedStructure(selection);
    setFocusedHotspotId(selection?.source === "hotspot" ? selection.id ?? null : null);
    setShowStructureDetails(false);
    if (selection?.source === "hotspot") {
      const index = selectedOrgan.hotspots.findIndex((hotspot) => hotspot.id === selection.id);
      if (index >= 0 && guideActive) setGuideIndex(index);
      const storyPosition = activeStory?.steps.findIndex((step) => step.hotspotId === selection.id) ?? -1;
      if (storyPosition >= 0 && storyActive) setStoryIndex(storyPosition);
    } else if (selection?.source === "model") {
      setGuideActive(false);
      setStoryActive(false);
    }
  };
  const visibleFacts = showAllFacts ? selectedOrgan.facts : selectedOrgan.facts.slice(0, 3);
  const commandResults = (() => {
    const needle = query.trim().toLowerCase();
    const cleanedNeedle = needle.replace(/^(show|find|focus|isolate)\s+/, "");
    const results: Array<{ id: string; kind: "organ" | "landmark" | "filter" | "action" | "unavailable"; label: string; detail: string; organId?: AnatomyOrgan["id"]; hotspotId?: string; value?: string; action?: ViewerAction | "guide" | "story" }> = [];
    organs.forEach((organ) => {
      if (!needle || `${organ.name} ${organ.system} ${organ.region}`.toLowerCase().includes(needle)) results.push({ id: `organ-${organ.id}`, kind: "organ", label: organ.name, detail: `${organ.system} · ${organ.region}`, organId: organ.id });
      organ.hotspots.forEach((hotspot) => {
        if (cleanedNeedle && `${hotspot.label} ${organ.name}`.toLowerCase().includes(cleanedNeedle)) results.push({ id: `landmark-${organ.id}-${hotspot.id}`, kind: "landmark", label: hotspot.label, detail: `Landmark in ${organ.name}`, organId: organ.id, hotspotId: hotspot.id });
      });
    });
    Array.from(new Set(organs.flatMap((organ) => organ.systems ?? [organ.system]))).forEach((system) => {
      if (needle && system.toLowerCase().includes(needle)) results.push({ id: `system-${system}`, kind: "filter", label: system, detail: "Browse this body system", value: system });
    });
    Array.from(new Set(organs.map((organ) => organ.region))).forEach((region) => {
      if (needle && region.toLowerCase().includes(needle)) results.push({ id: `region-${region}`, kind: "filter", label: region, detail: "Browse this body region", value: region });
    });
    const actions: Array<{ label: string; detail: string; action: ViewerAction | "guide" | "story"; keywords: string }> = [
      { label: "Show reference labels", detail: "Display all named reference points", action: "toggle-labels", keywords: "show labels landmarks" },
      { label: "Fade specimen", detail: "Emphasise reference points", action: "toggle-fade", keywords: "fade transparency surroundings" },
      { label: "Restore complete specimen", detail: "Reset camera, visibility, and selection", action: "reset", keywords: "restore reset complete specimen" },
      { label: "Start guided exploration", detail: `Explore ${selectedOrgan.name} landmark by landmark`, action: "guide", keywords: "guide guided explore" },
      { label: "Start spatial story", detail: `Follow ${selectedOrgan.name} through a relationship journey`, action: "story", keywords: "story blood air bile urine journey" },
      { label: "Isolate selected surface", detail: "Available after selecting a 3D model surface", action: "toggle-isolate", keywords: "isolate surface" },
    ];
    actions.forEach((item) => {
      if (!needle || `${item.label} ${item.keywords}`.toLowerCase().includes(needle)) results.push({ id: `action-${item.action}`, kind: "action", label: item.label, detail: item.detail, action: item.action });
    });
    if (needle.includes("coronary")) results.push({ id: "unavailable-coronary", kind: "unavailable", label: "Coronary arteries are not mapped yet", detail: "This model does not yet include separate coronary-artery landmarks.", });
    return results.slice(0, 9);
  })();
  const runCommand = (result: (typeof commandResults)[number]) => {
    if (result.kind === "organ" && result.organId) chooseOrgan(result.organId);
    if (result.kind === "landmark" && result.organId && result.hotspotId) {
      const organ = organs.find((item) => item.id === result.organId);
      const hotspot = organ?.hotspots.find((item) => item.id === result.hotspotId);
      if (organ && hotspot) {
        setSelectedId(organ.id); setGuideActive(false); setStoryActive(false); setFocusedHotspotId(hotspot.id); setSelectedStructure({ id: hotspot.id, name: hotspot.label, detail: hotspot.detail, source: "hotspot" }); setShowStructureDetails(false);
      }
    }
    if (result.kind === "filter" && result.value) { setLibraryMode(result.id.startsWith("system-") ? "system" : "region"); setLibraryFilter(result.value); }
    if (result.kind === "action") {
      if (result.action === "guide") startGuide();
      else if (result.action === "story") selectStoryStep(0);
      else if (result.action) window.dispatchEvent(new CustomEvent<ViewerAction>("corpus:viewer-action", { detail: result.action }));
    }
    setQuery("");
    setCommandOpen(false);
  };
  const handleCommandKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!commandOpen || commandResults.length === 0) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setCommandIndex((index) => (index + 1) % commandResults.length); }
    if (event.key === "ArrowUp") { event.preventDefault(); setCommandIndex((index) => (index - 1 + commandResults.length) % commandResults.length); }
    if (event.key === "Enter") { event.preventDefault(); runCommand(commandResults[commandIndex]); }
    if (event.key === "Escape") setCommandOpen(false);
  };

  return (
    <main className="atelier-shell">
      <header className="atelier-topbar">
        <div className="atelier-brand"><strong>Corpus<sup>✦</sup></strong><em>Visual anatomy, without clutter</em></div>
        <nav className="atelier-nav" aria-label="Primary navigation"><Link aria-current="page" className="active" href="/anatomy"><Compass size={17} />Explore</Link><Link href="/library"><LibraryBig size={17} />Library</Link><Link href="/guide"><BookOpen size={17} />Guide</Link></nav>
        <div className="atelier-commandbar"><label className="atelier-search"><Search size={16} /><input value={query} onFocus={() => setCommandOpen(true)} onKeyDown={handleCommandKeyDown} onChange={(event) => searchOrgans(event.target.value)} placeholder="Search anatomy or type a command" role="combobox" aria-expanded={commandOpen} aria-controls="anatomy-commands" aria-activedescendant={commandResults[commandIndex] ? `command-${commandResults[commandIndex].id}` : undefined} /></label>{commandOpen && <div className="atelier-command-results" id="anatomy-commands" role="listbox">{commandResults.length ? commandResults.map((result, index) => <button id={`command-${result.id}`} aria-selected={index === commandIndex} className={result.kind === "unavailable" ? "unavailable" : ""} key={result.id} role="option" type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => result.kind !== "unavailable" && runCommand(result)}><span><b>{result.label}</b><small>{result.detail}</small></span>{result.kind === "action" ? <Zap size={14} /> : <ArrowRight size={14} />}</button>) : <p>No matching organs, landmarks, regions, or commands.</p>}</div>}</div>
        <div className="atelier-share-controls"><button type="button" onClick={saveBookmark} title="Save this view"><Bookmark size={15} /> Save</button><button type="button" onClick={() => void copyShareLink()} title="Copy a link to this view">{shareStatus === "Link copied" ? <Check size={15} /> : <Share2 size={15} />} Share</button><button type="button" aria-expanded={bookmarksOpen} onClick={() => setBookmarksOpen((value) => !value)} title="Open saved views">Bookmarks</button>{bookmarksOpen && <div className="atelier-bookmarks">{bookmarks.length ? bookmarks.map((bookmark) => <a key={bookmark.href} href={bookmark.href}>{bookmark.label}</a>) : <p>Save an organ, landmark, story step, or relationship to return here.</p>}</div>}</div>
        <span className="atelier-model-count" aria-label={`${organs.length} anatomy models available`}>{organs.length} models</span>
      </header>

      <div className="atelier-workspace">
        <aside className="atelier-library" id="organ-library" aria-label="Organ library">
          <div className="atelier-panel-heading"><span>Explore the atlas</span><small>{visibleOrgans.length} shown</small></div>
          <div className="atelier-library-explorer">
            <div role="tablist" aria-label="Browse organ library"><button role="tab" type="button" aria-selected={libraryMode === "system"} className={libraryMode === "system" ? "active" : ""} onClick={() => changeLibraryMode("system")}>Systems</button><button role="tab" type="button" aria-selected={libraryMode === "region"} className={libraryMode === "region" ? "active" : ""} onClick={() => changeLibraryMode("region")}>Regions</button></div>
            <label><span>{libraryMode === "system" ? "Body system" : "Body region"}</span><select value={libraryFilter} onChange={(event) => setLibraryFilter(event.target.value)}>{libraryOptions.map((option) => <option key={option} value={option}>{option === "All" ? `All ${libraryMode === "system" ? "systems" : "regions"}` : option}</option>)}</select></label>
          </div>
          <div className="atelier-organ-list">
            {visibleOrgans.map((organ) => (
              <button
                aria-pressed={organ.id === selectedOrgan.id}
                className={`atelier-organ ${organ.id === selectedOrgan.id ? "active" : ""}`}
                key={organ.id}
                onClick={() => chooseOrgan(organ.id)}
                style={{ "--organ-accent": organ.accent } as CSSProperties}
                type="button"
              >
                <Image src={`/anatomy/${organ.id}/thumb.webp`} alt="" width={47} height={47} />
                <span><b>{organ.name}</b><small>{libraryMode === "system" ? organ.region : organ.system}</small></span>
                {organ.id === selectedOrgan.id && <i aria-hidden="true">♥</i>}
              </button>
            ))}
            {visibleOrgans.length === 0 && <p className="atelier-empty">No matching organs.</p>}
          </div>
          <button className="atelier-view-all" type="button" onClick={() => { setQuery(""); setLibraryFilter("All"); }}>Show all models <span>→</span></button>
        </aside>

        <label className="atelier-mobile-picker">
          <span>Viewing</span>
          <select aria-label="Choose an organ" value={selectedId} onChange={(event) => chooseOrgan(event.target.value as AnatomyOrgan["id"])}>
            {organs.map((organ) => <option key={organ.id} value={organ.id}>{organ.name}</option>)}
          </select>
        </label>
        <Viewer key={selectedOrgan.id} activeHotspotId={guideHotspot?.id ?? storyStep?.hotspotId ?? focusedHotspotId} relatedHotspotIds={relationshipHotspotIds} organ={selectedOrgan} onStructureSelect={handleStructureSelect} />

        <aside className="atelier-info" aria-live="polite" aria-label="Anatomy information">
          <div className="atelier-kicker">{selectedStructure ? `Selected structure · ${selectedStructure.name}` : `The ${selectedOrgan.name.toLowerCase()}`}</div>
          <div className={`atelier-title ${selectedStructure ? "selected" : ""}`}><div><h1>{selectedStructure?.name ?? selectedOrgan.name}</h1><em>{selectedStructure ? `Landmark of the ${selectedOrgan.name.toLowerCase()}` : selectedOrgan.subtitle}</em></div><Image src={`/anatomy/${selectedOrgan.id}/organ.webp`} alt={`${selectedOrgan.name} anatomical illustration`} width={82} height={82} /></div>
          <p className="atelier-description">{selectedStructure ? selectedStructure.detail : selectedOrgan.description}</p>
          <div className="atelier-rule" />
          <div className="atelier-content-badges" aria-label="Content review and source">
            <span><BadgeCheck size={14} /> Reviewed anatomy content</span>
            <a href={selectedOrgan.contentSource.href} target="_blank" rel="noreferrer"><span>Source</span>{selectedOrgan.contentSource.label}<ExternalLink size={12} aria-hidden="true" /></a>
          </div>
          {selectedProfile && selectedStructure && <section className="atelier-structure-card" aria-label={`${selectedStructure.name} anatomy details`}>
            <div className="atelier-structure-card-heading"><span>At a glance</span><strong>{selectedOrgan.name}</strong></div>
            <dl>
              <div><dt>What it is</dt><dd>{selectedProfile.what}</dd></div>
              <div><dt>Function</dt><dd>{selectedProfile.function}</dd></div>
              {showStructureDetails && <><div><dt>Location / course</dt><dd>{selectedProfile.location}</dd></div><div><dt>Key relations</dt><dd>{selectedProfile.relations}</dd></div></>}
            </dl>
            {showStructureDetails && <div className="atelier-structure-clinical"><Stethoscope size={14} /><p><b>Clinical note</b>{selectedProfile.clinicalNote}</p></div>}
            <button className="atelier-details-toggle" type="button" aria-expanded={showStructureDetails} onClick={() => setShowStructureDetails((value) => !value)}>{showStructureDetails ? "Show less" : "View location, relations & clinical note"}</button>
          </section>}
          <section className="atelier-relationships" aria-label={`${selectedOrgan.name} relationships`}>
            <div className="atelier-relationships-heading"><span><GitCompareArrows size={14} /> Relationships</span><small>Choose two landmarks</small></div>
            <div className="atelier-relationship-selects"><label><span>First</span><select value={relationshipFromId} onChange={(event) => chooseRelationshipSide("from", event.target.value)}>{selectedOrgan.hotspots.map((hotspot) => <option key={hotspot.id} value={hotspot.id}>{hotspot.label}</option>)}</select></label><label><span>Second</span><select value={relationshipToId} onChange={(event) => chooseRelationshipSide("to", event.target.value)}>{selectedOrgan.hotspots.map((hotspot) => <option key={hotspot.id} value={hotspot.id}>{hotspot.label}</option>)}</select></label></div>
            {selectedRelationship ? <div className="atelier-relationship-answer"><b>{selectedRelationship.kind}</b><p>{selectedRelationship.summary}</p>{selectedRelationshipReference && <a href={selectedRelationshipReference.href} rel="noreferrer" target="_blank">Reviewed source: {selectedRelationshipReference.label} <ExternalLink aria-hidden="true" size={12} /></a>}</div> : <p className="atelier-relationship-empty">This pair is not clinically mapped yet. Try a highlighted connection from the current specimen.</p>}
            <p className="atelier-relationship-scope">Vessel and surgical relationships are cited individually. Nerve relationships will appear when segmented nerve landmarks are added.</p>
          </section>
          {activeStory && <section className="atelier-story" aria-label={`${activeStory.title} spatial story`}>
            {storyStep ? <>
              <div className="atelier-story-heading"><span><Route size={13} /> Spatial story</span><button type="button" onClick={stopStory} aria-label="Exit spatial story"><X size={15} /> Exit</button></div>
              <p className="atelier-story-progress">{storyIndex + 1} of {activeStory.steps.length}</p>
              <h2>{storyStep.title}</h2>
              <p>{storyStep.detail}</p>
              <div className="atelier-story-actions"><button type="button" disabled={storyIndex === 0} onClick={() => selectStoryStep(storyIndex - 1)}><ArrowLeft size={15} /> Previous</button><button className="primary" type="button" onClick={() => storyIndex === activeStory.steps.length - 1 ? stopStory() : selectStoryStep(storyIndex + 1)}>{storyIndex === activeStory.steps.length - 1 ? "Finish story" : "Continue"}<ArrowRight size={15} /></button></div>
            </> : <>
              <span><Route size={13} /> Spatial story</span>
              <h2>{activeStory.title}</h2>
              <p>{activeStory.intro}</p>
              <button className="atelier-story-start" type="button" onClick={() => selectStoryStep(0)}>Begin the journey <ArrowRight size={15} /></button>
            </>}
          </section>}
          <section className="atelier-guide" aria-label={`${selectedOrgan.name} guided exploration`}>
            {guideHotspot ? (
              <>
                <div className="atelier-guide-heading"><span>Guided exploration</span><button type="button" onClick={stopGuide} aria-label="Exit guided exploration"><X size={15} /> Exit</button></div>
                <p className="atelier-guide-progress">{selectedOrgan.name} <b>Â· {guideIndex + 1} of {selectedOrgan.hotspots.length}</b></p>
                <h2>{guideHotspot.label}</h2>
                <p>{guideHotspot.detail}</p>
                <div className="atelier-guide-actions"><button type="button" disabled={guideIndex === 0} onClick={() => selectGuideStep(guideIndex - 1)}><ArrowLeft size={15} /> Previous</button><button className="primary" type="button" onClick={() => guideIndex === selectedOrgan.hotspots.length - 1 ? stopGuide() : selectGuideStep(guideIndex + 1)}>{guideIndex === selectedOrgan.hotspots.length - 1 ? "Finish" : "Next landmark"}<ArrowRight size={15} /></button></div>
              </>
            ) : (
              <>
                <span>Guided exploration</span>
                <h2>Explore the {selectedOrgan.name.toLowerCase()} in {selectedOrgan.hotspots.length} landmark{selectedOrgan.hotspots.length === 1 ? "" : "s"}</h2>
                <p>Follow a short, focused path through the key structures and their relationships.</p>
                <button className="atelier-guide-start" type="button" onClick={startGuide}>Start exploration <ArrowRight size={15} /></button>
              </>
            )}
          </section>
          <h2>{selectedStructure ? `${selectedOrgan.name} facts` : "Key facts"}</h2>
          <dl className="atelier-facts">
            {visibleFacts.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}
          </dl>
          {selectedOrgan.facts.length > 3 && <button className="atelier-facts-toggle" type="button" aria-expanded={showAllFacts} onClick={() => setShowAllFacts((value) => !value)}>{showAllFacts ? "Show fewer facts" : `Show ${selectedOrgan.facts.length - 3} more facts`}</button>}
          <div className="atelier-note medical"><Stethoscope size={15} /><p><b>Clinical context</b>Use the model to understand spatial relationships; it is educational and not clinical advice.</p></div>
          <section className="atelier-reference-points" id="learning-guide">
            <h2>Reference points</h2>
            {selectedOrgan.hotspots.length > 0 ? <ul>{selectedOrgan.hotspots.map((hotspot, index) => <li key={hotspot.id}><button type="button" onClick={() => selectGuideStep(index)}><b>{hotspot.label}</b><span>Explore <ArrowRight size={13} /></span></button></li>)}</ul> : <p>Named in-model reference points are being clinically mapped for this specimen.</p>}
          </section>
          <p className="atelier-content-status">Content level: concise orientation. More detailed, sourced structure notes will be added as each model is clinically mapped.</p>
        </aside>
      </div>
    </main>
  );
}
