import Image from "next/image";
import { Globe2 } from "lucide-react";
import { homeAssets } from "@/lib/home-ecosystem";
import { siteConfig } from "@/lib/site-config";

export function HomeFooterBar() {
  return (
    <footer className="home-footer-bar">
      <Image
        src={homeAssets.footer}
        alt=""
        fill
        sizes="100vw"
        className="home-footer-art"
      />

      <div className="home-footer-content" aria-label="Pie de página">
        <div className="home-footer-socials">
          <span>SÍGUENOS</span>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
            IG
          </a>
          <a href={siteConfig.youtube} target="_blank" rel="noreferrer">
            YT
          </a>
          <a href={siteConfig.tiktok} target="_blank" rel="noreferrer">
            TT
          </a>
          <a href={siteConfig.spotify} target="_blank" rel="noreferrer">
            SP
          </a>
        </div>

        <div className="home-footer-center">
          <strong>SW</strong>
          <span>
            SANTUARIO<span>WAV</span>
          </span>
          <small>© 2024</small>
        </div>

        <div className="home-footer-location">
          <span>{siteConfig.city}</span>
          <Globe2 size={24} />
        </div>
      </div>
    </footer>
  );
}
