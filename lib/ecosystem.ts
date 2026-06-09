export type EcosystemTone = "marketing" | "revista" | "eventos";

export type EcosystemCard = {
  title: string;
  shortTitle: string;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  href: string;
  featured: boolean;
  tags: string[];
  cta: string;
  tone: EcosystemTone;
  statement: string;
  marker: string;
};

export const ecosystemCards: EcosystemCard[] = [
  {
    title: "Santuario Marketing",
    shortTitle: "Marketing",
    label: "Linea comercial",
    eyebrow: "Contenido / Estrategia / Conversion",
    headline: "No es solo contenido. Es una estructura.",
    description:
      "Estrategia, contenido y pauta para marcas que quieren crecer con identidad.",
    href: "/marketing",
    featured: true,
    tags: ["Reels", "Ads", "Funnel", "Marca", "Conversion"],
    cta: "Ver linea comercial",
    tone: "marketing",
    statement: "NO ES SOLO CONTENIDO. ES UNA ESTRUCTURA.",
    marker: "001",
  },
  {
    title: "SANTUARIOWAV Revista",
    shortTitle: "Revista",
    label: "Linea editorial",
    eyebrow: "Cultura / Opinion / Musica",
    headline: "La calle es nuestro escenario.",
    description:
      "Opinion, analisis creativo, musica, marcas y fenomenos culturales desde una mirada editorial.",
    href: "/revista",
    featured: false,
    tags: ["Opinion", "Musica", "Marcas", "Cultura", "Tendencias"],
    cta: "Leer revista",
    tone: "revista",
    statement: "LA CALLE ES NUESTRO ESCENARIO.",
    marker: "VOL. 03",
  },
  {
    title: "Santuario Eventos",
    shortTitle: "Eventos",
    label: "Linea experiencial",
    eyebrow: "Recaps / Agenda / Cobertura",
    headline: "Del evento al archivo.",
    description:
      "Recaps, coberturas y agenda de los espacios donde ocurre el movimiento.",
    href: "/eventos",
    featured: false,
    tags: ["Recaps", "Agenda", "Cobertura", "Video", "Experiencia"],
    cta: "Ver eventos",
    tone: "eventos",
    statement: "DEL EVENTO AL ARCHIVO.",
    marker: "REC",
  },
];
