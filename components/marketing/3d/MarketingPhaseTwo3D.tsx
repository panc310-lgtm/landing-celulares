import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MarketingCharacterScene } from "./MarketingCharacterScene";
import { MarketingFloatingUi } from "./MarketingFloatingUi";

const phaseBullets = ["Presencia", "Confianza", "Conversión"];

// Este componente está listo para colocarse como segunda fase/sección de acción de Santuario Marketing.
export function MarketingPhaseTwo3D() {
  return (
    <section className="marketing-phase-two" aria-labelledby="marketing-phase-two-title">
      <div className="marketing-phase-two__inner">
        <div className="marketing-phase-two__copy">
          <p className="marketing-phase-two__eyebrow">FASE 02 / MODELO DE ACCIÓN</p>

          <h2 id="marketing-phase-two-title" className="marketing-phase-two__title">
            SISTEMA. PRESENCIA. CONVERSIÓN EN MOVIMIENTO.
          </h2>

          <p className="marketing-phase-two__text">
            No mostramos piezas aisladas. Construimos un sistema visual y estratégico
            que convierte la atención en autoridad.
          </p>

          <ul className="marketing-phase-two__pillars" aria-label="Pilares del sistema">
            {phaseBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <a className="marketing-phase-two__cta" href="#enfoque">
            Explorar sistema
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="marketing-phase-two__panel">
          <div className="marketing-phase-two__canvas">
            <Image
              src="/santuario/seccion2/sujeto_.png"
              alt=""
              fill
              sizes="(max-width: 1180px) 78vw, 640px"
              className="marketing-phase-two__reference-portrait"
              aria-hidden="true"
            />
            <MarketingCharacterScene />
            <MarketingFloatingUi />
          </div>
        </div>
      </div>
    </section>
  );
}
