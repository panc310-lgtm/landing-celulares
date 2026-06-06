export type EcosystemCard = {
  id: string;
  title: string;
  label: string;
  description: string;
  href: string;
  tags: string[];
  tone: "marketing" | "revista" | "eventos";
};

export const ecosystemCards: EcosystemCard[] = [
  {
    id: "santuario-marketing",
    title: "Santuario Marketing",
    label: "Growth",
    description:
      "Estrategia, pauta y sistemas de crecimiento para marcas con ambicion digital.",
    href: "/ads",
    tags: ["Estrategia", "Ads", "Conversion"],
    tone: "marketing",
  },
  {
    id: "santuariowav-revista",
    title: "SANTUARIOWAV Revista",
    label: "Editorial",
    description:
      "Contenido editorial, cultura y narrativa visual para amplificar historias.",
    href: "/reels",
    tags: ["Cultura", "Contenido", "Narrativa"],
    tone: "revista",
  },
  {
    id: "santuario-eventos",
    title: "Santuario Eventos",
    label: "Experiencias",
    description:
      "Experiencias, produccion y cobertura audiovisual para momentos memorables.",
    href: "/estrategia",
    tags: ["Eventos", "Produccion", "Cobertura"],
    tone: "eventos",
  },
];
