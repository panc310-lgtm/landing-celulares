import Image from "next/image";
import { homeAssets } from "@/lib/home-ecosystem";

export function HomeBackground() {
  return (
    <div className="home-background" aria-hidden="true">
      <Image
        src={homeAssets.background}
        alt=""
        fill
        priority
        sizes="100vw"
        className="home-bg-image"
      />
      <div className="home-bg-grid" />
      <div className="home-bg-noise" />
      <div className="home-bg-vignette" />
    </div>
  );
}
