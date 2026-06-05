"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Layers,
  BarChart3,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

const brand = {
  whatsappLink:
    "https://wa.me/57XXXXXXXXXX?text=Hola%20Santuariowav%2C%20quiero%20una%20estrategia%20de%20Ads%20y%20retargeting",
};

const funnelAds = [
  {
    stage: "TOFU",
    title: "Awareness / Alcance",
    goal: "Traer gente nueva con intención",
    bullets: [
      "Creativos: hooks fuertes + comparativas + “no compres si…”",
      "Segmentación: intereses amplios + lookalikes (si aplica)",
      "KPI: ThruPlay/retención, CPM, reproducciones",
    ],
  },
  {
    stage: "MOFU",
    title: "Consideración",
    goal: "Convertir curiosidad en confianza",
    bullets: [
      "Creativos: prueba social + procesos + objeciones",
      "Audiencias: video viewers 25–95%, IG engagers",
      "KPI: CTR, guardados, visitas al perfil/landing",
    ],
  },
  {
    stage: "BOFU",
    title: "Conversión / Retargeting",
    goal: "Mensajes y ventas",
    bullets: [
      "Creativos: oferta clara + urgencia + garantías",
      "Audiencias: visitantes landing, add-to-cart, DM intent",
      "KPI: CPA, costo por mensaje, ROAS (si ecommerce)",
    ],
  },
];

const check = [
  "Pixel / eventos configurados (Meta/TikTok)",
  "UTMs para medir campañas",
  "Landing o WhatsApp con guion de cierre",
  "Biblioteca de creativos (mínimo 10 variantes)",
  "Tablero semanal de métricas",
];

export default function AdsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al Home
        </Link>

        <p className="mt-6 text-sm text-white/70">Ads + Retargeting</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
          Campañas que convierten (TOFU → MOFU → BOFU)
        </h1>
        <p className="mt-3 text-white/70 max-w-3xl">
          No es “poner plata”. Es tener creativos, medición y retargeting para
          cerrar ventas con consistencia.
        </p>

        {/* Resumen rápido */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Target className="h-6 w-6 text-orange-400" />
            <p className="mt-3 text-lg font-semibold">Objetivo</p>
            <p className="mt-1 text-sm text-white/70">
              Mensajes + ventas, con control de CPA.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Layers className="h-6 w-6 text-orange-400" />
            <p className="mt-3 text-lg font-semibold">Sistema</p>
            <p className="mt-1 text-sm text-white/70">
              3 niveles de campaña para escalar sin quemar presupuesto.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <BarChart3 className="h-6 w-6 text-orange-400" />
            <p className="mt-3 text-lg font-semibold">Medición</p>
            <p className="mt-1 text-sm text-white/70">
              Decisiones semanales basadas en datos.
            </p>
          </div>
        </div>

        {/* TOFU MOFU BOFU */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {funnelAds.map((f) => (
            <div
              key={f.stage}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs font-semibold text-orange-400">{f.stage}</p>
              <p className="mt-2 text-lg font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-white/70">{f.goal}</p>

              <div className="mt-4 grid gap-2">
                {f.bullets.map((b) => (
                  <div
                    key={b}
                    className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/80"
                  >
                    <span className="text-orange-400 font-semibold">• </span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-lg font-semibold">Checklist para que Ads funcione</p>
          <p className="mt-1 text-sm text-white/70">
            Si falla uno, el costo sube. Nosotros lo dejamos todo listo.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {check.map((c) => (
              <div
                key={c}
                className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/80"
              >
                <CheckCircle2 className="inline-block mr-2 h-4 w-4 text-emerald-400" />
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/70">¿Quieres que lo corramos por ti?</p>
            <p className="mt-1 text-xl font-semibold">
              Te armamos campañas + creativos + retargeting.
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