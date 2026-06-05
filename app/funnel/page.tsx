"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const brand = {
  whatsappLink:
    "https://wa.me/57XXXXXXXXXX?text=Hola%20Santuariowav%2C%20quiero%20optimizar%20mi%20perfil%20y%20funnel",
};

const blocks = [
  {
    title: "1) Perfil que convierte",
    desc: "Tu perfil debe cerrar ventas incluso cuando tú no estás conectado.",
    items: [
      "Bio: qué haces + para quién + resultado + CTA",
      "Highlights: prueba social, garantías, FAQs, procesos",
      "Posts fijados: oferta, caso/resultado, “cómo trabajamos”",
      "Link/CTA: WhatsApp o landing (un solo camino)",
    ],
  },
  {
    title: "2) Ruta simple de conversión",
    desc: "El funnel es el camino: atención → confianza → acción.",
    items: [
      "TOFU: videos virales/educativos para alcance",
      "MOFU: comparativas, casos, procesos, objeciones",
      "BOFU: testimonios, ofertas claras, urgencia, retargeting",
      "Cierre: WhatsApp/checkout con guion de venta",
    ],
  },
  {
    title: "3) Automatización ligera",
    desc: "Sin complicarte: respuesta rápida + etiqueta + siguiente paso.",
    items: [
      "Mensajes guardados (3 respuestas rápidas)",
      "Pregunta filtro: presupuesto / necesidad / ciudad",
      "Etiqueta: lead caliente / tibio / frío",
      "Seguimiento: 24h + 72h (con prueba social)",
    ],
  },
];

export default function FunnelPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al Home
        </Link>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-sm text-white/70">Perfil + Funnel</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Optimización del perfil y ruta de conversión
            </h1>
            <p className="mt-3 text-white/70">
              Esto es lo que hacemos para que Instagram/TikTok no sean “likes”,
              sino una máquina de mensajes y ventas.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            <Workflow className="h-5 w-5 text-orange-400" />
            <p className="text-sm text-white/80">
              Atención → Confianza → Acción
            </p>
          </div>
        </div>

        {/* Infografía tipo “flow” */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { t: "Atención", d: "Hook + retención + alcance", icon: ShieldCheck },
            { t: "Confianza", d: "Prueba social + claridad", icon: CheckCircle2 },
            { t: "Acción", d: "CTA + WhatsApp/Checkout", icon: MessageCircle },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <x.icon className="h-6 w-6 text-orange-400" />
              <p className="mt-3 text-lg font-semibold">{x.t}</p>
              <p className="mt-1 text-sm text-white/70">{x.d}</p>
            </div>
          ))}
        </div>

        {/* Bloques explicativos */}
        <div className="mt-10 grid gap-4">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-lg font-semibold">{b.title}</p>
              <p className="mt-1 text-sm text-white/70">{b.desc}</p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {b.items.map((it) => (
                  <div
                    key={it}
                    className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/80"
                  >
                    <span className="text-orange-400 font-semibold">✓ </span>
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/70">¿Quieres que lo implementemos?</p>
            <p className="mt-1 text-xl font-semibold">
              Te entregamos perfil optimizado + funnel + guion de WhatsApp.
            </p>
          </div>
          <button
            onClick={() => window.open(brand.whatsappLink, "_blank")}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold hover:bg-emerald-700"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Agendar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}