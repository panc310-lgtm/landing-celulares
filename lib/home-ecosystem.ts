export type HomeEcosystemTone = "revista" | "marketing" | "eventos";

export type HomeEcosystemCard = {
  id: HomeEcosystemTone;
  title: string;
  label: string;
  eyebrow: string;
  description: string;
  body?: string;
  tags: string[];
  cta: string;
  href: string;
  image: string;
  imageLarge: string;
  tone: HomeEcosystemTone;
  featured?: boolean;
};

export const homeAssets = {
  background: "/santuario/home/Fondo.png",
  title: "/santuario/home/TItulo principal.png",
  titleCropped: "/santuario/home/Titulo_.png",
  footer: "/santuario/home/Barra inferior.png",
  primaryButton: "/santuario/home/boton 2.png",
  secondaryButton: "/santuario/home/boton 1.png",
};

export const homeEcosystemCards: HomeEcosystemCard[] = [
  {
    id: "revista",
    title: "SANTUARIOWAV REVISTA",
    label: "LÍNEA EDITORIAL",
    eyebrow: "VOL. 03 · PÁG. 01",
    description: "La calle es nuestro escenario.",
    tags: ["OPINIÓN", "MÚSICA", "MARCAS", "CULTURA", "TENDENCIAS"],
    cta: "LEER REVISTA",
    href: "/revista",
    image: "/santuario/home/dimension 1.png",
    imageLarge: "/santuario/home/Tarjeta 1_.png",
    tone: "revista",
  },
  {
    id: "marketing",
    title: "SANTUARIO MARKETING",
    label: "LÍNEA COMERCIAL",
    eyebrow: "CONTENIDO / ESTRATEGIA / CONVERSIÓN",
    description: "No es solo contenido. Es una estructura.",
    body: "Estrategia, contenido y pauta para marcas que quieren crecer con identidad.",
    tags: ["REELS", "ADS", "FUNNEL", "MARCA", "CONVERSIÓN"],
    cta: "VER LÍNEA COMERCIAL",
    href: "/marketing",
    image: "/santuario/home/dimension 2.png",
    imageLarge: "/santuario/home/tarjeta 2_.png",
    tone: "marketing",
    featured: true,
  },
  {
    id: "eventos",
    title: "SANTUARIO EVENTOS",
    label: "LÍNEA EXPERIENCIAL",
    eyebrow: "RECAPS / AGENDA / COBERTURA",
    description: "Del evento al archivo. De la noche al movimiento.",
    body: "Recaps, coberturas y agenda de los espacios donde ocurre el movimiento.",
    tags: ["RECAPS", "AGENDA", "COBERTURA", "VIDEO", "EXPERIENCIA"],
    cta: "VER EVENTOS",
    href: "/eventos",
    image: "/santuario/home/dimension 3.png",
    imageLarge: "/santuario/home/tarjeta 3_.png",
    tone: "eventos",
  },
];
