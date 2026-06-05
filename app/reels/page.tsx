"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, X } from "lucide-react";

type Reel = {
  id: string;
  title: string;
  src: string;
  poster: string;
  tag: string;
};

const reels: Reel[] = [
  {
    id: "r1",
    title: "Reel 1 — Hook + CTA",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1512499617640-c2f999fe7857?auto=format&fit=crop&w=1400&q=80",
    tag: "Venta",
  },
  {
    id: "r2",
    title: "Reel 2 — Prueba social",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=80",
    tag: "Confianza",
  },
  {
    id: "r3",
    title: "Reel 3 — Educación",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80",
    tag: "Educación",
  },
];

function Modal({
  open,
  onClose,
  reel,
}: {
  open: boolean;
  onClose: () => void;
  reel: Reel | undefined;
}) {
  if (!open || !reel) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 p-4 flex items-center justify-center">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black border border-white/10">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="aspect-[16/9] w-full">
          <video className="h-full w-full object-cover" src={reel.src} controls playsInline preload="metadata" poster={reel.poster} />
        </div>
        <div className="p-5 text-white">
          <p className="text-xs text-white/60">{reel.tag}</p>
          <p className="mt-1 text-lg font-semibold">{reel.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReelsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => reels.find((r) => r.id === openId), [openId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Volver al Home
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
          Producción vertical (Reels/TikTok)
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          En móvil: scroll tipo TikTok. En PC: álbum interactivo (cards + modal).
        </p>

        {/* MOBILE: scroll */}
        <div className="mt-8 md:hidden">
          <div className="h-[78vh] overflow-y-scroll snap-y snap-mandatory rounded-3xl border border-white/10">
            {reels.map((r) => (
              <div key={r.id} className="snap-start h-[78vh] relative">
                <video className="absolute inset-0 h-full w-full object-cover" src={r.src} poster={r.poster} controls playsInline />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
                  <p className="text-xs text-white/70">{r.tag}</p>
                  <p className="text-lg font-semibold">{r.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: album */}
        <div className="mt-8 hidden md:grid grid-cols-3 gap-5">
          {reels.map((r) => (
            <button
              key={r.id}
              onClick={() => setOpenId(r.id)}
              className="text-left rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition"
            >
              <div className="aspect-[16/10]">
                <img src={r.poster} alt={r.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-white/60">{r.tag}</p>
                  <p className="mt-1 font-semibold">{r.title}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                  <Play className="h-4 w-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal open={!!openId} onClose={() => setOpenId(null)} reel={active} />
    </div>
  );
}
