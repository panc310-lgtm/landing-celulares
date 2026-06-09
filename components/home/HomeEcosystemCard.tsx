"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.54,
          delay: 0.12 + index * 0.08,
          ease: "easeOut" as const,
        }}
        whileHover={{ y: -8, scale: card.featured ? 1.018 : 1.015 }}
        whileTap={{ scale: 0.985 }}
      >
        <Link href={card.href} className={`home-card home-card-${card.tone}`}>
          <Image
            src={card.image}
            alt={card.title}
            fill
            priority={card.featured}
            sizes={sizesByTone[card.tone]}
            className="home-card-image"
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
