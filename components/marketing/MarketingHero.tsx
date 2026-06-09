"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { motion, type Variants } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { marketingFeatures, marketingStats } from "@/lib/marketing";
import { MarketingBrandsRow } from "./MarketingBrandsRow";
import { MarketingFeatureCard } from "./MarketingFeatureCard";
import { MarketingFocusBanner } from "./MarketingFocusBanner";
import { MarketingNavbar } from "./MarketingNavbar";
import { MarketingPerformanceCard } from "./MarketingPerformanceCard";
import { MarketingStatCard } from "./MarketingStatCard";
import { ScrollIndicator } from "./ScrollIndicator";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: "easeOut" as const },
  },
};

const portraitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.12, ease: "easeOut" as const },
  },
};

export function MarketingHero() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    active: false,
    visible: false,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const target = event.target as HTMLElement;
    const isOnCard = Boolean(
      target.closest(".marketing-feature-card, .marketing-performance-card")
    );

    setCursor({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      active: isOnCard,
      visible: true,
    });
  }

  return (
    <section className="marketing-hero" id="diagnostico">
      <div className="marketing-hero-bg" aria-hidden="true" />
      <MarketingNavbar />

      <motion.div
        className="marketing-hero-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="marketing-hero-copy">
          <motion.p className="marketing-hero-kicker" variants={fadeUpVariants}>
            MÓDULO: SANTUARIO MARKETING
          </motion.p>

          <motion.h1 className="marketing-hero-title" variants={fadeUpVariants}>
            <span>NO ES SOLO</span>
            <span>CONTENIDO.</span>
            <span className="marketing-hero-title-accent">ES UNA</span>
            <span className="marketing-hero-title-accent">ESTRUCTURA.</span>
          </motion.h1>

          <motion.p className="marketing-hero-subcopy" variants={fadeUpVariants}>
            Creamos sistemas de contenido para marcas que necesitan{" "}
            <strong>presencia</strong>, <strong>confianza</strong> y{" "}
            <strong>conversión</strong>.
          </motion.p>

          <motion.div className="marketing-hero-actions" variants={fadeUpVariants}>
            <Button asChild size="4" radius="full" className="marketing-primary-button">
              <Link href="#diagnostico">
                Agendar diagnóstico
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button
              asChild
              size="4"
              radius="full"
              variant="surface"
              className="marketing-secondary-button"
            >
              <Link href="#enfoque">
                <PlayCircle size={20} />
                Ver cómo funciona
              </Link>
            </Button>
          </motion.div>

          <motion.div className="marketing-stats-row" variants={fadeUpVariants}>
            {marketingStats.map((stat) => (
              <MarketingStatCard key={stat.label} {...stat} />
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <MarketingBrandsRow />
          </motion.div>
        </div>

        <motion.div
          className="marketing-hero-visual"
          onPointerMove={handlePointerMove}
          onPointerLeave={() =>
            setCursor((current) => ({ ...current, visible: false, active: false }))
          }
        >
          <motion.span
            className={`marketing-visual-cursor${
              cursor.visible ? " is-visible" : ""
            }${cursor.active ? " is-active" : ""}`}
            aria-hidden="true"
            animate={{
              x: cursor.x - (cursor.active ? 54 : 28),
              y: cursor.y - (cursor.active ? 54 : 28),
            }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
          />

          <motion.div
            className="marketing-portrait-shell"
            variants={portraitVariants}
          >
            <div className="marketing-portrait-halo" aria-hidden="true" />
            <div className="marketing-portrait-placeholder">
              <Image
                src="/images/marketing/hero-portrait.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1180px) 80vw, 620px"
              />
              <span>Imagen principal</span>
            </div>
          </motion.div>

          <motion.div
            className="marketing-feature-stack"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {marketingFeatures.map((feature, index) => (
              <MarketingFeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div className="marketing-performance-wrap" variants={fadeUpVariants}>
            <MarketingPerformanceCard />
          </motion.div>

          <span className="marketing-system-orbit orbit-one" aria-hidden="true" />
          <span className="marketing-system-orbit orbit-two" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        id="enfoque"
        className="marketing-focus-wrap"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.42, ease: "easeOut" as const }}
      >
        <MarketingFocusBanner />
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
