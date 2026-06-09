import Image from "next/image";
import Link from "next/link";
import { homeAssets } from "@/lib/home-ecosystem";

export function HomeActions() {
  return (
    <div className="home-actions">
      <Link
        href="/marketing"
        className="home-action-button home-action-button-secondary"
      >
        <Image
          src={homeAssets.secondaryButton}
          alt=""
          fill
          sizes="(max-width: 900px) 92vw, 360px"
          className="home-action-image"
        />
        <span>EXPLORAR ECOSISTEMA →</span>
      </Link>

      <Link href="/marketing" className="home-action-button home-action-button-primary">
        <Image
          src={homeAssets.primaryButton}
          alt=""
          fill
          sizes="(max-width: 900px) 92vw, 430px"
          className="home-action-image"
        />
        <span>TRABAJAR CON SANTUARIO MARKETING →</span>
      </Link>
    </div>
  );
}
