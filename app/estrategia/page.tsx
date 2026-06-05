"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function EstrategiaPage() {
  const steps = [
    { n: "01", title: "Diagnóstico", desc: "Analizamos oferta, audiencia, competencia y perfil actual para detectar fugas." },
    { n: "02", title: "Arquitectura", desc: "Definimos pilares, líneas narrativas, tono y series de contenido (sin improvisar)." },
    { n: "03", title: "Guiones", desc: "Ideas → guiones listos para grabar + testeo de formatos (IG/TikTok)." },
    { n: "04", title: "Producción", desc: "Flujo de grabación/edición para sostener consistencia con calidad." },
    { n: "05", title: "Medición", desc: "Retención, guardados, mensajes, CTR. Lo que funciona se multiplica." },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Volver al Home
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
          Estrategia de contenido (simple y ejecutable)
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Así construimos un sistema para atraer, retener y convertir (sin depender de improvisación).
        </p>

        <div className="mt-10 grid gap-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-2xl bg-orange-500/90 flex items-center justify-center font-semibold">
                  {s.n}
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold">{s.title}</p>
                  <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Entregable: plan + ejemplos aplicados
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}