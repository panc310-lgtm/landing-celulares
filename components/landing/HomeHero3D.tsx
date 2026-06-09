"use client";

import Link from "next/link";
import { Text } from "@radix-ui/themes";
import { Menu } from "lucide-react";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { EditorialLabel } from "@/components/visual/EditorialLabel";
import { GlowOrb } from "@/components/visual/GlowOrb";
import { GrainOverlay } from "@/components/visual/GrainOverlay";
import { RedEditorialFrame } from "@/components/visual/RedEditorialFrame";
import { SideEditorialText } from "@/components/visual/SideEditorialText";
import { FloatingEcosystemStage } from "@/components/landing/FloatingEcosystemStage";
import { HeroActions } from "@/components/landing/HeroActions";
import { siteConfig } from "@/lib/site-config";

export function HomeHero3D() {
  return (
    <section className="home-hero-3d">
      <BackgroundGrid />
      <GrainOverlay />
      <GlowOrb tone="red" className="hero-glow-red" />
      <GlowOrb tone="cyan" className="hero-glow-cyan" />
      <GlowOrb tone="gold" className="hero-glow-gold" />
      <RedEditorialFrame />

      <nav className="hero-nav" aria-label="Navegacion principal">
        <Link href="/" className="hero-brand" aria-label="SANTUARIOWAV home">
          <span>SANTUARIO<span>WAV</span></span>
          <small>ECOSISTEMA DIGITAL</small>
        </Link>

        <div className="hero-nav-center">
          <Link href="/marketing">Ecosistema</Link>
          <Link href="/revista">Nosotros</Link>
          <Link href="/eventos">Manifiesto</Link>
          <a href={`mailto:${siteConfig.email}`}>Contacto</a>
        </div>

        <div className="hero-nav-meta">
          <span>VOL. 01</span>
          <small>PAG. 01</small>
          <Menu size={28} />
        </div>
      </nav>

      <SideEditorialText side="left" />
      <SideEditorialText side="right" />

      <div className="hero-content">
        <EditorialLabel>ECOSISTEMA DIGITAL / VOL. 01</EditorialLabel>
        <h1 className="hero-title">
          SANTUARIO<span>WAV</span>
        </h1>
        <Text as="p" className="hero-claim">
          CONTENIDO QUE CONECTA. · MUSICA QUE UNE. · CULTURA QUE TRASCIENDE.
        </Text>
        <Text as="p" className="hero-subcopy">
          Un ecosistema digital donde marketing, revista y eventos trabajan como
          una sola plataforma de movimiento cultural.
        </Text>

        <FloatingEcosystemStage />
        <HeroActions />
      </div>

      <footer className="hero-footer">
        <div className="hero-socials">
          <span>SIGUENOS</span>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
            IG
          </a>
          <span>YT</span>
          <span>TT</span>
          <span>SP</span>
        </div>
        <div className="hero-footer-mark">SW · SANTUARIO<span>WAV</span></div>
        <div className="hero-city">{siteConfig.city}</div>
      </footer>
    </section>
  );
}
