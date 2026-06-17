"use client";

import { useState } from "react";
import Image from "next/image";
import { characterAssets } from "./character-assets";

export function MarketingCharacterFallback() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return process.env.NODE_ENV === "development" ? (
      <div className="marketing-character-dev-placeholder">
        Asset de personaje no disponible
      </div>
    ) : null;
  }

  return (
    <div className="marketing-character-fallback">
      <Image
        src={characterAssets.final}
        alt="Sujeto Santuario Marketing"
        fill
        priority
        draggable={false}
        className="marketing-character-final-image"
        sizes="(min-width: 1200px) 34vw, 90vw"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
