"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ecosystemCards, type EcosystemCard, type EcosystemTone } from "@/lib/ecosystem";
import { FloatingPaletteCard } from "@/components/landing/FloatingPaletteCard";

type ActiveCursor = {
  tone: EcosystemTone;
  label: string;
};

export function FloatingEcosystemStage() {
  const reduceMotion = useReducedMotion();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [activeCursor, setActiveCursor] = useState<ActiveCursor | null>(null);
  const cursorXValue = useMotionValue(-120);
  const cursorYValue = useMotionValue(-120);
  const cursorX = useSpring(cursorXValue, { stiffness: 420, damping: 34 });
  const cursorY = useSpring(cursorYValue, { stiffness: 420, damping: 34 });

  const cards = useMemo(
    () => ({
      marketing: ecosystemCards.find((card) => card.tone === "marketing"),
      revista: ecosystemCards.find((card) => card.tone === "revista"),
      eventos: ecosystemCards.find((card) => card.tone === "eventos"),
    }),
    []
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    cursorXValue.set(event.clientX - rect.left);
    cursorYValue.set(event.clientY - rect.top);

    if (reduceMotion) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: Math.max(-4, Math.min(4, y * -8)),
      y: Math.max(-6, Math.min(6, x * 12)),
    });
  }

  function handleMouseLeave() {
    setRotation({ x: 0, y: 0 });
    setActiveCursor(null);
  }

  function handleCursorChange(card: EcosystemCard | null) {
    setActiveCursor(card ? { tone: card.tone, label: card.shortTitle } : null);
  }

  if (!cards.marketing || !cards.revista || !cards.eventos) {
    return null;
  }

  return (
    <div
      className={[
        "floating-stage",
        activeCursor && "floating-stage-active",
        activeCursor && `floating-stage-active-${activeCursor.tone}`,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="floating-stage-inner"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <FloatingPaletteCard
          card={cards.revista}
          position="left"
          onCursorChange={handleCursorChange}
        />
        <FloatingPaletteCard
          card={cards.marketing}
          position="center"
          onCursorChange={handleCursorChange}
        />
        <FloatingPaletteCard
          card={cards.eventos}
          position="right"
          onCursorChange={handleCursorChange}
        />
      </div>

      <motion.div
        aria-hidden="true"
        className={[
          "stage-cursor",
          activeCursor && "stage-cursor-visible",
          activeCursor && `stage-cursor-${activeCursor.tone}`,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ left: cursorX, top: cursorY }}
      >
        <span>{activeCursor?.label ?? "Abrir"}</span>
      </motion.div>
    </div>
  );
}
