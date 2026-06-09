import { Button, Card, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { MessageCircle } from "lucide-react";
import { marketingServices, marketingStats } from "@/lib/marketing";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { MotionCard } from "@/components/motion/MotionCard";
import { EditorialLabel } from "@/components/visual/EditorialLabel";
import { GlowOrb } from "@/components/visual/GlowOrb";

export function MarketingBlock() {
  return (
    <section className="editorial-section marketing-block">
      <GlowOrb color="red" size="lg" className="marketing-glow" />
      <Container size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
          <FadeIn>
            <div>
              <p className="section-kicker">Santuario Marketing</p>
              <h2 className="section-title">
                NO ES SOLO CONTENIDO.
                <br />
                ES UNA ESTRUCTURA.
              </h2>
              <p className="section-description">
                Creamos sistemas de contenido para marcas que necesitan presencia,
                confianza y conversion.
              </p>
              <Flex gap="3" wrap="wrap" className="marketing-stats">
                {marketingStats.map((item) => (
                  <div key={item.value}>
                    <Text as="p" className="stat-value">
                      {item.value}
                    </Text>
                    <Text as="p" size="1" className="stat-label">
                      {item.label}
                    </Text>
                  </div>
                ))}
              </Flex>
              <Button asChild size="4" className="button-red">
                <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} />
                  Solicitar estrategia
                </a>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="service-grid">
            {marketingServices.map((service, index) => (
              <MotionCard key={service}>
                <Card className="service-card">
                  <EditorialLabel>{String(index + 1).padStart(2, "0")}</EditorialLabel>
                  <Text as="p" size="4" weight="bold">
                    {service}
                  </Text>
                </Card>
              </MotionCard>
            ))}
          </StaggerContainer>
        </Grid>
      </Container>
    </section>
  );
}
