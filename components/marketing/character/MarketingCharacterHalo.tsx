"use client";

import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

type MarketingCharacterHaloProps = {
  haloX: MotionValue<number>;
  haloY: MotionValue<number>;
};

export function MarketingCharacterHalo({ haloX, haloY }: MarketingCharacterHaloProps) {
  return (
    <motion.div
      className="marketing-character-halo"
      aria-hidden="true"
      style={{ x: haloX, y: haloY }}
    >
      <span className="marketing-character-halo-core" />
      <span className="marketing-character-halo-ring" />
      <span className="marketing-character-halo-ring-secondary" />
      <span className="marketing-character-halo-grid" />
    </motion.div>
  );
}
