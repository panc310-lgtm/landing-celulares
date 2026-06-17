import Image from "next/image";

export function MarketingHeroBackground() {
  return (
    <div className="marketing-hero-background" aria-hidden="true">
      <Image
        src="/santuario/seccion2/Fondo 1.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="marketing-hero-bg-image"
      />
    </div>
  );
}
