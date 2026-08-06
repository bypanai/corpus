export type LandingStep = {
  title: string;
  description: string;
};

export type LandingFeature = {
  title: string;
  description: string;
};

export type LandingAudience = {
  title: string;
  description: string;
};

export const learningSteps: LandingStep[] = [
  {
    title: "Explore",
    description: "Start with an organ or body system and inspect it from every angle.",
  },
  {
    title: "Isolate",
    description: "Hide surrounding layers to focus on a structure and its nearest relationships.",
  },
  {
    title: "Connect",
    description: "Follow a guided path that links landmarks to anatomy and function.",
  },
];

export const explorerFeatures: LandingFeature[] = [
  {
    title: "Rotate and zoom",
    description: "See each specimen from multiple viewpoints without flattening the anatomy.",
  },
  {
    title: "Select structures",
    description: "Tap landmarks to reveal concise orientation notes and spatial context.",
  },
  {
    title: "Hide and restore",
    description: "Remove surrounding layers to make key anatomy easier to compare.",
  },
  {
    title: "Follow guided paths",
    description: "Move through a short anatomy story that links structure to function.",
  },
];

export const audienceCards: LandingAudience[] = [
  {
    title: "Health-science students",
    description: "Build a reliable spatial foundation before practicals and exams.",
  },
  {
    title: "Educators",
    description: "Use a shared 3D view to explain relationships that diagrams flatten.",
  },
  {
    title: "Visual learners",
    description: "Move beyond memorising labels and see how structures connect.",
  },
];
