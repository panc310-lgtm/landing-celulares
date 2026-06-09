import Image from "next/image";
import { homeAssets } from "@/lib/home-ecosystem";

export function HomeHeroTitle() {
  return (
    <div className="home-title-block">
      <div className="home-title-art" aria-hidden="true">
        <Image
          src={homeAssets.title}
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 96vw, 1280px"
          className="home-title-image"
        />
      </div>

      <div className="home-title-semantic">
        <p className="home-title-kicker">ECOSISTEMA DIGITAL / VOL. 01</p>
        <h1 className="home-title-main">
          SANTUARIO<span>WAV</span>
        </h1>
        <p className="home-title-claim">
          CONTENIDO QUE CONECTA. · MÚSICA QUE UNE. · CULTURA QUE TRASCIENDE.
        </p>
        <p className="home-title-subcopy">
          Un ecosistema digital donde marketing, revista y eventos trabajan como
          una sola plataforma de movimiento cultural.
        </p>
      </div>
    </div>
  );
}
