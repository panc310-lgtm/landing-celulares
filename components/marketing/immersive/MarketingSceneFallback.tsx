import Image from "next/image";
import { marketingLogoAssets } from "./MarketingLogoModel";

export function MarketingSceneFallback() {
  return (
    <div className="marketing-scene-fallback">
      <span className="marketing-scene-fallback-halo" aria-hidden="true" />
      <Image
        src={marketingLogoAssets.fallback}
        alt="Logo 3D de Santuario Marketing"
        fill
        priority
        draggable={false}
        className="marketing-scene-fallback-image"
        sizes="(min-width: 1200px) 48vw, 90vw"
      />
    </div>
  );
}
