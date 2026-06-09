import { Button, Card, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { Play, Radio } from "lucide-react";
import { eventosBlocks, eventosTimeline } from "@/lib/eventos";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { MotionCard } from "@/components/motion/MotionCard";
import { GlowOrb } from "@/components/visual/GlowOrb";
import { EditorialLabel } from "@/components/visual/EditorialLabel";

export function EventosBlock() {
  return (
    <section className="dark-section eventos-block">
      <GlowOrb color="gold" size="lg" className="eventos-glow" />
      <Container size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
          <FadeIn>
            <div className="video-recap-card">
              <div className="video-recap-media">
                <div
                  className="video-recap-image"
                  role="img"
                  aria-label="Evento cultural nocturno documentado por SANTUARIOWAV"
                />
                <div className="play-disc">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              <Flex justify="between" align="center" gap="4" className="video-recap-meta">
                <div>
                  <EditorialLabel>REC / COBERTURA</EditorialLabel>
                  <Text as="p" size="5" weight="bold">
                    Movimiento capturado en tiempo real.
                  </Text>
                </div>
                <Radio size={24} />
              </Flex>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="section-kicker">Santuario Eventos</p>
            <h2 className="section-title">
              DEL EVENTO AL ARCHIVO.
              <br />
              DE LA NOCHE AL MOVIMIENTO.
            </h2>
            <p className="section-description">
              Documentamos experiencias, activamos comunidades y convertimos cada
              evento en memoria audiovisual.
            </p>
            <StaggerContainer className="eventos-list">
              {eventosBlocks.map((block) => (
                <MotionCard key={block}>
                  <Card className="eventos-pill">
                    <Text as="p" size="2" weight="bold">
                      {block}
                    </Text>
                  </Card>
                </MotionCard>
              ))}
            </StaggerContainer>
            <Button asChild size="4" className="button-red">
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                Solicitar cobertura
              </a>
            </Button>
          </FadeIn>
        </Grid>

        <Grid columns={{ initial: "1", md: "3" }} gap="4" className="timeline-grid">
          {eventosTimeline.map((item) => (
            <Card key={item.title} className="timeline-card">
              <EditorialLabel>{item.date}</EditorialLabel>
              <Text as="p" size="4" weight="bold">
                {item.title}
              </Text>
              <Text as="p" size="2" className="muted-copy">
                {item.description}
              </Text>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
