import { ecosystemCards } from "@/lib/ecosystem";
import { FadeIn } from "@/components/motion/FadeIn";
import { EcosystemCard } from "@/components/landing/EcosystemCard";

export function EcosystemCards() {
  return (
    <section className="ecosystem-section">
      <FadeIn>
        <div>
          <p className="section-kicker">Ecosistema Santuario</p>
          <h2 className="section-title">
            Tres frentes para crecer, narrar y conectar.
          </h2>
          <p className="section-description">
            Unimos marketing, contenido editorial y experiencias para construir
            marcas con presencia real dentro y fuera de pantalla.
          </p>
        </div>
      </FadeIn>

      <div className="ecosystem-grid">
        {ecosystemCards.map((card, index) => (
          <FadeIn key={card.id} delay={index * 0.08}>
            <EcosystemCard
              title={card.title}
              label={card.label}
              description={card.description}
              href={card.href}
              tags={card.tags}
              tone={card.tone}
              featured={card.id === "santuario-marketing"}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
