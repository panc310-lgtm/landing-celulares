"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { MarketingEnergyWave } from "./MarketingEnergyWave";
import { MarketingFloatingCards } from "./MarketingFloatingCards";
import { MarketingFocusBanner } from "./MarketingFocusBanner";
import { MarketingHeroBackground } from "./MarketingHeroBackground";
import { MarketingHeroCopy } from "./MarketingHeroCopy";
import { MarketingHeroFlow } from "./MarketingHeroFlow";
import { MarketingHeroSubject } from "./MarketingHeroSubject";
import { MarketingGlobalAtmosphere } from "./immersive/MarketingGlobalAtmosphere";
import { MarketingNavbar } from "./MarketingNavbar";
import { MarketingPerformanceCard } from "./MarketingPerformanceCard";
import { ScrollIndicator } from "./ScrollIndicator";

type MarketingHeroStyle = CSSProperties & {
  "--mx": string;
  "--my": string;
};

export function MarketingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || !heroRef.current) {
      return;
    }

    const bounds = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroRef.current.style.setProperty("--mx", x.toFixed(4));
    heroRef.current.style.setProperty("--my", y.toFixed(4));
  }

  function handlePointerLeave() {
    if (!heroRef.current) {
      return;
    }

    heroRef.current.style.setProperty("--mx", "0");
    heroRef.current.style.setProperty("--my", "0");
  }

  return (
    <section
      ref={heroRef}
      className="marketing-hero"
      id="diagnostico"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ "--mx": "0", "--my": "0" } as MarketingHeroStyle}
    >
      <MarketingHeroBackground />
      <MarketingHeroFlow />
      <MarketingGlobalAtmosphere />
      <MarketingNavbar />

      <div className="marketing-hero-stage">
        <MarketingHeroCopy />
        <MarketingHeroSubject />
        <MarketingFloatingCards />
        <MarketingPerformanceCard />
        <MarketingFocusBanner />
        <MarketingEnergyWave />
        <ScrollIndicator />
      </div>
    </section>
  );
}
