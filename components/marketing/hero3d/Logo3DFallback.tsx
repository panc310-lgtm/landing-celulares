import Image from "next/image";
import { hero3DAssets } from "./hero3d-assets";

export function Logo3DFallback() {
  return (
    <div className="hero3d-fallback">
      <Image
        src={hero3DAssets.fallback}
        alt="Logo 3D de Santuario"
        fill
        priority
        draggable={false}
        className="hero3d-fallback-image"
        sizes="(min-width: 1200px) 42vw, 86vw"
      />
    </div>
  );
}
