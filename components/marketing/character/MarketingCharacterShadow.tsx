"use client";

import type { MotionValue } from "motion/react";
import { motion, useTransform } from "motion/react";

type MarketingCharacterShadowProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

export function MarketingCharacterShadow({ mouseX, mouseY }: MarketingCharacterShadowProps) {
  const x = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const y = useTransform(mouseY, [-0.5, 0.5], [7, -7]);

  return (
    <motion.span
      className="marketing-character-shadow"
      aria-hidden="true"
      style={{ x, y }}
    />
  );
}
