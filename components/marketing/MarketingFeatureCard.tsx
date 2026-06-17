"use client";

import { motion } from "motion/react";
import { Edit3, Plus, ShieldCheck, TrendingUp } from "lucide-react";

type MarketingFeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
  index?: number;
};

const iconMap = {
  content: Edit3,
  shield: ShieldCheck,
  growth: TrendingUp,
};

export function MarketingFeatureCard({
  title,
  description,
  icon = "content",
  index = 0,
}: MarketingFeatureCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Edit3;

  return (
    <div
      className={`marketing-feature-card-shell marketing-feature-card-shell-${index + 1}`}
    >
      <motion.article
        className="marketing-feature-card"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.55,
          delay: index * 0.08,
          ease: "easeOut" as const,
        }}
        whileHover={{ y: -6, scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="marketing-feature-icon">
          <Icon size={22} />
        </span>
        <div>
          <h3 className="marketing-feature-title">{title}</h3>
          <p className="marketing-feature-description">{description}</p>
        </div>
        <span className="marketing-feature-plus">
          <Plus size={16} />
        </span>
      </motion.article>
    </div>
  );
}
