"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { HomeEcosystemCard as HomeEcosystemCardData } from "@/lib/home-ecosystem";

type HomeEcosystemCardProps = {
  card: HomeEcosystemCardData;
  index: number;
};

const iconMap = {
  revista: BookOpen,
  marketing: TrendingUp,
  eventos: CalendarDays,
};

const sizesByTone = {
  revista: "(max-width: 900px) 92vw, 410px",
  marketing: "(max-width: 900px) 92vw, 520px",
  eventos: "(max-width: 900px) 92vw, 440px",
};

export function HomeEcosystemCard({ card, index }: HomeEcosystemCardProps) {
  const Icon = iconMap[card.tone];
  const prefersReducedMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 22 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const rawX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const rawY = (event.clientY - bounds.top) / bounds.height - 0.5;
    const x = Math.max(-0.5, Math.min(rawX, 0.5)) * 2;
    const y = Math.max(-0.5, Math.min(rawY, 0.5)) * 2;
    const intensity = card.featured ? 13 : 10;

    rotateXValue.set(y * -intensity);
    rotateYValue.set(x * intensity);
  }

  function handleMouseLeave() {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }

  return (
    <div
      className={[
        "home-card-shell",
        `home-card-shell-${card.tone}`,
        card.featured && "home-card-shell-featured",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div
        className="home-card-motion"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.54,
          delay: 0.12 + index * 0.08,
          ease: "easeOut" as const,
        }}
        whileHover={
          prefersReducedMotion
            ? undefined
            : { y: -8, scale: card.featured ? 1.018 : 1.015 }
        }
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      >
        <Link href={card.href} className={`home-card home-card-${card.tone}`}>
          <Image
            src={card.image}
            alt={card.title}
            width={1448}
            height={1086}
            priority={card.featured}
            sizes={sizesByTone[card.tone]}
            className="home-card-image home-card-image-small"
            draggable={false}
          />
          <Image
            src={card.imageLarge}
            alt=""
            width={1122}
            height={1402}
            sizes="(max-width: 900px) 92vw, 620px"
            className="home-card-image-large"
            aria-hidden="true"
            draggable={false}
          />

          <span className={`home-card-floating-icon home-card-floating-icon-${card.tone}`}>
            <Icon size={24} />
          </span>

          <span className="home-card-accessible-copy">
            <span>{card.label}</span>
            <strong>{card.title}</strong>
            <span>{card.description}</span>
            <span>{card.cta}</span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
