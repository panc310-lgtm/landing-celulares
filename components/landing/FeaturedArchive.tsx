import { Card, Container, Text } from "@radix-ui/themes";
import { ArrowUpRight } from "lucide-react";
import { featuredArchive } from "@/lib/featured";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { MotionCard } from "@/components/motion/MotionCard";
import { EditorialLabel } from "@/components/visual/EditorialLabel";

export function FeaturedArchive() {
  return (
    <section className="editorial-section archive-block">
      <Container size="4">
        <FadeIn>
          <div className="section-heading">
            <p className="section-kicker">Archivo destacado</p>
            <h2 className="section-title">ARCHIVO EN MOVIMIENTO</h2>
            <p className="section-description">
              Campanas, articulos, recaps y eventos que construyen la memoria del
              ecosistema.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="archive-grid">
          {featuredArchive.map((item) => (
            <MotionCard key={item.title}>
              <Card className={`archive-card archive-card-${item.tone}`}>
                <EditorialLabel>{item.type}</EditorialLabel>
                <Text as="p" size="6" weight="bold">
                  {item.title}
                </Text>
                <Text as="p" size="2" className="muted-copy">
                  {item.description}
                </Text>
                <Text as="span" size="2" weight="bold" className="archive-cta">
                  {item.cta}
                  <ArrowUpRight size={16} />
                </Text>
              </Card>
            </MotionCard>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
