export type CharacterLayerId =
  | "turnaround-primary"
  | "turnaround-secondary"
  | "motion-frontal"
  | "motion-frontal-alt"
  | "motion-diagonal"
  | "motion-lateral-left"
  | "motion-lateral-right"
  | "motion-lateral-alt"
  | "motion-back"
  | "view-back-left"
  | "view-back-right"
  | "view-side-left"
  | "view-side-right"
  | "view-diagonal-left"
  | "view-diagonal-right"
  | "view-front"
  | "portrait-reference"
  | "hero"
  | "hero-rim";

export type CharacterLayerConfig = {
  id: CharacterLayerId;
  src: string;
  depth: number;
  movement: number;
  zIndex: number;
  opacity: number;
  priority?: boolean;
  unoptimized?: boolean;
};

export const characterAssets = {
  glb: "/santuario/rostro/base.glb",
  final: "/santuario/rostro/sujeto.png",
  portraitReference: "/santuario/rostro/Referencia.png",
  references: {
    turnaroundPrimary: "/santuario/rostro/ChatGPT Image 10 jun 2026, 03_33_07 p.m..png",
    turnaroundSecondary: "/santuario/rostro/ChatGPT Image 10 jun 2026, 10_27_41 a.m..png",
    rawDesignSource: "/santuario/rostro/Rostros ",
  },
  views: {
    front: "/santuario/rostro/frente_.png",
    sideLeft: "/santuario/rostro/lateral 1.png",
    sideRight: "/santuario/rostro/lateral 2.png",
    diagonalLeft: "/santuario/rostro/Diagonal 1_.png",
    diagonalRight: "/santuario/rostro/Diagonal 2.png",
    backLeft: "/santuario/rostro/parte trasera_.png",
    backRight: "/santuario/rostro/parte trasera 2.png",
  },
  motion: {
    frontal: "/santuario/rostro/frontal-.gif",
    frontalAlt: "/santuario/rostro/frontal-2.gif",
    diagonal: "/santuario/rostro/diagonal.gif",
    lateralLeft: "/santuario/rostro/lateral.gif",
    lateralRight: "/santuario/rostro/lateral2.gif",
    lateralAlt: "/santuario/rostro/laterla-.gif",
    back: "/santuario/rostro/trasera.gif",
  },
};

export const characterLayerConfig: CharacterLayerConfig[] = [
  {
    id: "turnaround-primary",
    src: characterAssets.references.turnaroundPrimary,
    depth: -150,
    movement: 0.16,
    zIndex: 1,
    opacity: 0.1,
  },
  {
    id: "turnaround-secondary",
    src: characterAssets.references.turnaroundSecondary,
    depth: -132,
    movement: 0.2,
    zIndex: 2,
    opacity: 0.08,
  },
  {
    id: "motion-back",
    src: characterAssets.motion.back,
    depth: -112,
    movement: 0.24,
    zIndex: 3,
    opacity: 0.1,
    unoptimized: true,
  },
  {
    id: "motion-lateral-left",
    src: characterAssets.motion.lateralLeft,
    depth: -102,
    movement: 0.3,
    zIndex: 4,
    opacity: 0.12,
    unoptimized: true,
  },
  {
    id: "motion-lateral-right",
    src: characterAssets.motion.lateralRight,
    depth: -96,
    movement: 0.34,
    zIndex: 5,
    opacity: 0.12,
    unoptimized: true,
  },
  {
    id: "motion-lateral-alt",
    src: characterAssets.motion.lateralAlt,
    depth: -88,
    movement: 0.38,
    zIndex: 6,
    opacity: 0.1,
    unoptimized: true,
  },
  {
    id: "motion-diagonal",
    src: characterAssets.motion.diagonal,
    depth: -78,
    movement: 0.42,
    zIndex: 7,
    opacity: 0.12,
    unoptimized: true,
  },
  {
    id: "motion-frontal",
    src: characterAssets.motion.frontal,
    depth: -68,
    movement: 0.46,
    zIndex: 8,
    opacity: 0.1,
    unoptimized: true,
  },
  {
    id: "motion-frontal-alt",
    src: characterAssets.motion.frontalAlt,
    depth: -58,
    movement: 0.5,
    zIndex: 9,
    opacity: 0.08,
    unoptimized: true,
  },
  {
    id: "view-back-left",
    src: characterAssets.views.backLeft,
    depth: -46,
    movement: 0.54,
    zIndex: 10,
    opacity: 0.16,
  },
  {
    id: "view-back-right",
    src: characterAssets.views.backRight,
    depth: -34,
    movement: 0.6,
    zIndex: 11,
    opacity: 0.16,
  },
  {
    id: "view-side-left",
    src: characterAssets.views.sideLeft,
    depth: -18,
    movement: 0.68,
    zIndex: 12,
    opacity: 0.18,
  },
  {
    id: "view-side-right",
    src: characterAssets.views.sideRight,
    depth: -8,
    movement: 0.74,
    zIndex: 13,
    opacity: 0.18,
  },
  {
    id: "view-diagonal-left",
    src: characterAssets.views.diagonalLeft,
    depth: 8,
    movement: 0.82,
    zIndex: 14,
    opacity: 0.22,
  },
  {
    id: "view-diagonal-right",
    src: characterAssets.views.diagonalRight,
    depth: 20,
    movement: 0.9,
    zIndex: 15,
    opacity: 0.2,
  },
  {
    id: "view-front",
    src: characterAssets.views.front,
    depth: 32,
    movement: 0.98,
    zIndex: 16,
    opacity: 0.24,
  },
  {
    id: "portrait-reference",
    src: characterAssets.portraitReference,
    depth: 48,
    movement: 1.05,
    zIndex: 17,
    opacity: 0.16,
  },
  {
    id: "hero",
    src: characterAssets.final,
    depth: 82,
    movement: 1.16,
    zIndex: 18,
    opacity: 1,
    priority: true,
  },
  {
    id: "hero-rim",
    src: characterAssets.final,
    depth: 116,
    movement: 1.34,
    zIndex: 19,
    opacity: 0.28,
  },
];
