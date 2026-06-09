import { ecosystemCards } from "@/lib/ecosystem";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { EcosystemCard } from "@/components/landing/EcosystemCard";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { GlowOrb } from "@/components/visual/GlowOrb";

export function EcosystemCards() {
  return (
    <section id="ecosistema" className="ecosystem-section">
      <BackgroundGrid />
      <GlowOrb color="red" size="lg" className="ecosystem-glow-a" />
      <GlowOrb color="cyan" size="md" className="ecosystem-glow-b" />
      <FadeIn>
        <div className="section-heading">
          <p className="section-kicker">Ecosistema Santuario</p>
          <h2 className="section-title">
            Tres puertas para crecer, narrar y conectar.
          </h2>
          <p className="section-description">
            Una landing de producto digital construida como una revista cultural:
            estrategia, opinion y experiencia orbitando la misma identidad.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="ecosystem-grid">
        {ecosystemCards.map((card) => (
          <div key={card.title} className={card.featured ? "ecosystem-card-slot-featured" : ""}>
            <EcosystemCard
              title={card.title}
              label={card.label}
              eyebrow={card.eyebrow}
              description={card.description}
              href={card.href}
              tags={card.tags}
              cta={card.cta}
              tone={card.tone}
              featured={card.featured}
              statement={card.statement}
              marker={card.marker}
            />
          </div>
        ))}
      </StaggerContainer>
    </section>
  );
}
