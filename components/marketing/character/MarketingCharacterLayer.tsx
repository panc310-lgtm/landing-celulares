"use client";

import { useState } from "react";
import Image from "next/image";
import type { MotionValue } from "motion/react";
import { motion, useTransform } from "motion/react";
import type { CharacterLayerConfig } from "./character-assets";

type MarketingCharacterLayerProps = {
  layer: CharacterLayerConfig;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

export function MarketingCharacterLayer({
  layer,
  mouseX,
  mouseY,
}: MarketingCharacterLayerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const x = useTransform(mouseX, [-0.5, 0.5], [
    -18 * layer.movement,
    18 * layer.movement,
  ]);
  const y = useTransform(mouseY, [-0.5, 0.5], [
    -10 * layer.movement,
    10 * layer.movement,
  ]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className={`marketing-character-layer marketing-character-layer--${layer.id}`}
      style={{
        x,
        y,
        z: layer.depth,
        zIndex: layer.zIndex,
        opacity: layer.opacity,
      }}
    >
      <Image
        src={layer.src}
        alt=""
        fill
        priority={layer.priority}
        draggable={false}
        unoptimized={layer.unoptimized}
        className="marketing-character-layer-image"
        sizes="(min-width: 1200px) 34vw, 90vw"
        onError={() => setIsVisible(false)}
      />
    </motion.div>
  );
}
