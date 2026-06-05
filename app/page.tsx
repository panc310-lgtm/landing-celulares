"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Play,
  Search,
  Star,
  X,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FadeIn } from "@/components/ui/fade-in";
import { TiltCard } from "@/components/ui/tilt-card";

/**
 * Portafolio Santuariowav — Hero full-screen con VIDEO (como referencia Folioblox)
 * Cambios:
 * - Menú a la derecha (Home/About/Projects + botón Get in touch)
 * - Video ocupando toda la primera pantalla
 * - "Lo que hacemos" en caja más pequeña (prioridad audiovisual)
 * - Links a rutas internas: /estrategia /reels /funnel /ads
 *
 * FIX BUG:
 * - Eliminamos cualquier dependencia de getElementById().
 * - Navegación por refs (más estable en Next + Turbopack).
 */

const brand = {
  name: "Santuariowav",
  headlineSmall: "Hey, somos",
  headlineBigA: "Contenido",
  headlineBigB: "Audiovisual",
  subtitleRightTitle: "El contenido debe sentirse invisible.",
  subtitleRightBody:
    "De guión a edición, construimos piezas verticales que conectan y convierten.",
  city: "Popayán",
  region: "Cauca",
  email: "hola@santuariowav.com",
  whatsappLink:
    "https://wa.me/57XXXXXXXXXX?text=Hola%20Santuariowav%2C%20quiero%20una%20propuesta%20de%20contenido%20y%20crecimiento",
  websiteUrl: "https://santuariowav.com",
};

// Video hero (20s). Reemplaza por tu URL mp4.
const heroVideo = {
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  poster:
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=80",
};

type Project = {
  id: string;
  client: string;
  title: string;
  description: string;
  cover: string;
  tags: string[];
} & (
  | {
      type: "file";
      src: string;
    }
  | {
      type: "embed";
      embedUrl: string;
    }
);

const trusted = [
  { name: "Primocell" },
  { name: "Marca 2" },
  { name: "Marca 3" },
  { name: "Marca 4" },
  { name: "Marca 5" },
  { name: "Marca 6" },
];

const projects: Project[] = [
  {
    id: "primocell",
    client: "Primocell",
    title: "Crecimiento regional → ecommerce nacional",
    description:
      "Sistema de contenido vertical con prueba de confianza + CTAs a WhatsApp y retargeting.",
    cover:
      "https://images.unsplash.com/photo-1512499617640-c2f999fe7857?auto=format&fit=crop&w=1600&q=80",
    tags: ["Reels", "TikTok", "Ads"],
    type: "file",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: "case2",
    client: "Cliente",
    title: "Contenido que aumenta retención",
    description:
      "Hooks, edición dopamínica y narrativa para subir watch time y guardados.",
    cover:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
    tags: ["Retención", "Hook", "Story"],
    type: "file",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: "case3",
    client: "Cliente",
    title: "Oferta + mensajes por WhatsApp",
    description: "Piezas de conversión con objeciones claras y CTA directo.",
    cover:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    tags: ["Venta", "Objeciones"],
    type: "file",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
];

const approach = [
  {
    title: "Estrategia primero",
    desc: "Cada pieza responde a un objetivo: atraer, retener o convertir. Cero improvisación.",
  },
  {
    title: "Audiovisual nativo",
    desc: "Diseño visual, ritmo y edición pensada para IG/TikTok (no reciclada).",
  },
  {
    title: "Sistema escalable",
    desc: "Calendario + producción + medición + iteración. Lo que funciona, se multiplica.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AnchorButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-white/80 hover:text-white transition"
    >
      {children}
    </button>
  );
}

function ProjectCard({
  item,
  onOpen,
}: {
  item: Project;
  onOpen: (id: string) => void;
}) {
  return (
    <TiltCard>
      <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur overflow-hidden h-full">
        <div className="relative">
          <div className="aspect-[16/10] w-full">
            <img
              src={item.cover}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-white/70">{item.client}</p>
              <p className="mt-1 line-clamp-1 text-base font-semibold text-white">
                {item.title}
              </p>
            </div>
            <Button
              size="sm"
              className="bg-white/15 text-white hover:bg-white/25 backdrop-blur border border-white/20"
              onClick={() => onOpen(item.id)}
            >
              <Play className="mr-2 h-4 w-4" />
              Ver
            </Button>
          </div>
        </div>
        <CardContent className="p-5">
          <p className="text-sm text-white/70">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags?.map((t: string) => (
              <Badge key={t} variant="secondary" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
}

function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | undefined;
}) {
  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
              aria-label="Cerrar"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[16/9] w-full">
              {project.type === "embed" ? (
                <iframe
                  src={project.embedUrl}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  src={project.src}
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
            </div>

            <div className="p-5 text-white">
              <p className="text-xs text-white/70">{project.client}</p>
              <p className="mt-1 text-lg font-semibold">{project.title}</p>
              <p className="mt-2 text-sm text-white/80">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags?.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => window.open(brand.whatsappLink, "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Quiero una propuesta
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.open(brand.websiteUrl, "_blank")}
                >
                  Ver sitio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Page() {
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollToRef = useCallback((ref: React.RefObject<HTMLElement | null>, hash?: string) => {
    const el = ref.current;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // Fallback: solo si quieres conservar el hash
    if (typeof window !== "undefined" && hash) {
      window.location.hash = hash;
    }
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((p) =>
      `${p.client} ${p.title} ${p.description} ${(p.tags || []).join(" ")}`
        .toLowerCase()
        .includes(query)
    );
  }, [q]);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === openId),
    [openId]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO FULLSCREEN */}
      <header className="relative h-[100svh] w-full overflow-hidden">
        {/* Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.src}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlays (para legibilidad) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.10),transparent_55%)]" />

        {/* NAV (derecha) */}
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 backdrop-blur" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{brand.name}</p>
                <p className="text-xs text-white/60">
                  {brand.city}, {brand.region}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <AnchorButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Home
              </AnchorButton>
              <AnchorButton onClick={() => scrollToRef(aboutRef, "#about")}>
                About
              </AnchorButton>
              <AnchorButton onClick={() => scrollToRef(projectsRef, "#projects")}>
                Projects
              </AnchorButton>
              <MagneticButton>
                <Button
                  className="rounded-full bg-white text-black hover:bg-white/90"
                  onClick={() => scrollToRef(contactRef, "#contact")}
                >
                  Get in touch
                  <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </MagneticButton>
            </div>

            {/* móvil */}
            <div className="md:hidden">
              <Button
                size="sm"
                className="rounded-full bg-white text-black hover:bg-white/90"
                onClick={() => window.open(brand.whatsappLink, "_blank")}
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:pb-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm text-white/70">{brand.headlineSmall}</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-7xl">
                {brand.headlineBigA}
                <br />
                <span className="text-white">{brand.headlineBigB}</span>
              </h1>

              <FadeIn delay={0.2}>
                {/* Caja compacta (Lo que hacemos) */}
                <div className="mt-7 inline-flex w-full max-w-md flex-col gap-2 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur sm:max-w-sm">
                  <p className="text-xs font-semibold text-white/70">Lo que hacemos</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { n: "01", t: "Estrategia de contenido", href: "/estrategia" },
                      { n: "02", t: "Producción vertical", href: "/reels" },
                      { n: "03", t: "Perfil y funnel", href: "/funnel" },
                      { n: "04", t: "Ads + retargeting", href: "/ads" },
                    ].map((x) => (
                      <Link
                        key={x.n}
                        href={x.href}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 transition"
                      >
                        <p className="text-[11px] font-semibold text-orange-400">#{x.n}</p>
                        <p className="mt-0.5 text-xs text-white/85">{x.t}</p>
                        <p className="mt-1 text-[11px] text-white/55">Ver detalle →</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </motion.div>

            {/* Right: copy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="md:pb-6"
            >
              <p className="text-2xl font-semibold leading-tight sm:text-3xl">
                {brand.subtitleRightTitle}
              </p>
              <p className="mt-3 text-sm text-white/70 max-w-md">
                {brand.subtitleRightBody}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => window.open(brand.whatsappLink, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Quiero una propuesta
                  </Button>
                </MagneticButton>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/15 border border-white/15"
                  onClick={() => scrollToRef(projectsRef, "#projects")}
                >
                  Ver proyectos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Trusted by */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <FadeIn delay={0.1}>
          <p className="text-sm text-white/70">Trusted by brands we’ve helped shape</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {trusted.map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-semibold text-white/70 hover:bg-white/10 transition-colors"
              >
                {b.name}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <Separator className="mx-auto max-w-6xl bg-white/10" />

      {/* About */}
      <section
        id="about"
        ref={(el) => {
          aboutRef.current = el;
        }}
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <FadeIn direction="right" delay={0.1}>
            <p className="text-sm text-white/70">Behind the work</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Diseñamos contenido para que se vea brutal… y venda.
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Unimos guión, dirección, edición y performance. Menos piezas al azar,
              más sistema.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => window.open(brand.whatsappLink, "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Hablemos
                </Button>
              </MagneticButton>
              <Button
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/15 border border-white/15"
                onClick={() => setOpenId("primocell")}
              >
                <Play className="mr-2 h-4 w-4" />
                Ver caso Primocell
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-3xl border border-white/10 bg-white/5",
                  i === 1 ? "bg-white/10" : "bg-white/5"
                )}
              />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={(el) => {
          projectsRef.current = el;
        }}
        className="mx-auto max-w-6xl px-4 pb-14"
      >
        <FadeIn direction="up">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-white/70">Featured projects</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                Proyectos destacados
              </h3>
              <p className="mt-2 text-sm text-white/70 max-w-2xl">
                Casos y piezas verticales: hook, retención, prueba social y CTA.
              </p>
            </div>
            <div className="relative w-full sm:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar (Primocell, ads, retención…)"
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </FadeIn>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {filtered.map((p, idx) => (
            <FadeIn key={p.id} delay={0.1 * (idx + 1)}>
              <ProjectCard item={p} onOpen={setOpenId} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <FadeIn>
          <p className="text-sm text-white/70">
            Intentional. Collaborative. Built to last.
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">
            Cómo abordamos cada proyecto
          </h3>
          <p className="mt-2 text-sm text-white/70 max-w-2xl">
            Claridad + estética + conversión. Diseñamos para que se vea bien y funcione.
          </p>
        </FadeIn>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {approach.map((a, idx) => (
            <FadeIn key={a.title} delay={0.1 * (idx + 1)}>
              <Card className="rounded-3xl border-white/10 bg-white/5 h-full">
                <CardHeader>
                  <CardTitle className="text-base text-white">{a.title}</CardTitle>
                  <CardDescription className="text-white/70">{a.desc}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <FadeIn>
          <p className="text-sm text-white/70">Services</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">
            En qué te podemos ayudar
          </h3>
          <p className="mt-2 text-sm text-white/70 max-w-2xl">
            De estrategia a ejecución: lo necesario para crecer en IG/TikTok y convertir.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="mt-6 rounded-3xl border-white/10 bg-white/5">
            <CardContent className="p-6">
              <Tabs defaultValue="contenido" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5">
                  <TabsTrigger value="contenido">Contenido</TabsTrigger>
                  <TabsTrigger value="sistema">Sistema</TabsTrigger>
                  <TabsTrigger value="ads">Ads</TabsTrigger>
                </TabsList>

                <TabsContent value="contenido" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  >
                    <Card className="rounded-3xl border-white/10 bg-black/30">
                      <CardHeader>
                        <CardTitle className="text-base text-white">Producción vertical</CardTitle>
                        <CardDescription className="text-white/70">
                          Guion → grabación → edición → publicación.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-white/70">
                        Piezas diseñadas para retención (hook), claridad y CTA.
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-white/10 bg-black/30">
                      <CardHeader>
                        <CardTitle className="text-base text-white">Biblioteca de formatos</CardTitle>
                        <CardDescription className="text-white/70">
                          Testeo de formatos ganadores por nicho.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-white/70">
                        Repetimos lo que funciona y escalamos por series.
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="sistema" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  >
                    <Card className="rounded-3xl border-white/10 bg-black/30">
                      <CardHeader>
                        <CardTitle className="text-base text-white">Optimización de perfil</CardTitle>
                        <CardDescription className="text-white/70">
                          Bio, highlights, pruebas de confianza, CTA.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-white/70">
                        Tu perfil debe cerrar ventas incluso sin hablar contigo.
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-white/10 bg-black/30">
                      <CardHeader>
                        <CardTitle className="text-base text-white">Calendario + operación</CardTitle>
                        <CardDescription className="text-white/70">
                          Plan editorial y checklist de producción.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-white/70">Consistencia sin bajar calidad.</CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="ads" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                  >
                    {['Campañas', 'Retargeting', 'Conversión'].map((t) => (
                      <Card key={t} className="rounded-3xl border-white/10 bg-black/30">
                        <CardHeader>
                          <CardTitle className="text-base text-white">{t}</CardTitle>
                          <CardDescription className="text-white/70">
                            Estructura por objetivo (TOFU → MOFU → BOFU).
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
                    onClick={() => window.open(brand.whatsappLink, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Agenda una llamada
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15 border border-white/15 w-full sm:w-auto"
                    onClick={() => window.open(`mailto:${brand.email}`, "_blank")}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {brand.email}
                  </Button>
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* Contact */}
      <section
        id="contact"
        ref={(el) => {
          contactRef.current = el;
        }}
        className="mx-auto max-w-6xl px-4 pb-16"
      >
        <FadeIn direction="up">
          <Card className="rounded-3xl border-white/10 bg-white/5">
            <CardContent className="p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-white/70">
                    Let’s build something meaningful together
                  </p>
                  <h4 className="mt-1 text-2xl font-semibold tracking-tight">
                    ¿Listo para convertir con contenido?
                  </h4>
                  <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500" />
                    ))}
                    <span>Reputación regional</span>
                  </div>
                </div>
                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => window.open(brand.whatsappLink, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contactar por WhatsApp
                  </Button>
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">{brand.name}</p>
            <p className="text-sm text-white/70">
              {brand.city}, {brand.region} • {brand.email}
            </p>
          </div>
          <p className="mt-6 text-xs text-white/50">
            © {new Date().getFullYear()} {brand.name}. Portafolio de contenido.
          </p>
        </div>
      </footer>

      <ProjectModal
        open={!!openId}
        onClose={() => setOpenId(null)}
        project={activeProject}
      />
    </div>
  );
}
