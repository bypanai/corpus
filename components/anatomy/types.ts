export type ViewerAction = "reset" | "toggle-auto-rotate" | "toggle-labels" | "toggle-fullscreen" | "toggle-fade";

export type FocusMode = "normal" | "fade";

export type StructureSelection = {
  id?: string;
  name: string;
  detail: string;
  source: "hotspot" | "model";
};

export type AnatomyViewerHandle = {
  run: (action: ViewerAction) => void;
};
