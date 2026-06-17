"use client";

import { motion } from "motion/react";
import { characterLayerConfig } from "./character-assets";
import { MarketingCharacterFallback } from "./MarketingCharacterFallback";
import { MarketingCharacterHalo } from "./MarketingCharacterHalo";
import { MarketingCharacterLayer } from "./MarketingCharacterLayer";
import { MarketingCharacterShadow } from "./MarketingCharacterShadow";
import { useCharacterParallax } from "./useCharacterParallax";

export function MarketingCharacterHybrid2D() {
  const {
    smoothX,
    smoothY,
    rotateX,
    rotateY,
    haloX,
    haloY,
    handlePointerMove,
    handlePointerLeave,
  } = useCharacterParallax();

  return (
    <motion.div
      className="marketing-character-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="marketing-character-depth"
        style={{ rotateX, rotateY }}
      >
        <MarketingCharacterHalo haloX={haloX} haloY={haloY} />
        <MarketingCharacterShadow mouseX={smoothX} mouseY={smoothY} />
        {characterLayerConfig.length > 0 ? (
          <div className="marketing-character-stack">
            {characterLayerConfig.map((layer) => (
              <MarketingCharacterLayer
                key={layer.id}
                layer={layer}
                mouseX={smoothX}
                mouseY={smoothY}
              />
            ))}
          </div>
        ) : (
          <MarketingCharacterFallback />
        )}
      </motion.div>
    </motion.div>
  );
}
