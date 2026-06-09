import Link from "next/link";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { GlowOrb } from "@/components/visual/GlowOrb";
import { RedFrame } from "@/components/visual/RedFrame";
import { StampBadge } from "@/components/visual/StampBadge";
import { siteConfig } from "@/lib/site-config";

export function HeroManifesto() {
  return (
    <section className="hero-manifesto">
      <BackgroundGrid />
      <GlowOrb color="red" size="lg" className="hero-glow-red" />
      <GlowOrb color="cyan" size="md" className="hero-glow-cyan" />
      <Container size="4" className="hero-container">
        <RedFrame className="hero-frame">
          <FadeIn>
            <Flex direction="column" align="center" gap="5" className="hero-copy">
              <StampBadge>EDICION 01 / ECOSISTEMA DIGITAL</StampBadge>
              <h1 className="hero-title">
                SANTUARIOWAV
              </h1>
              <Text as="p" className="hero-claim">
                Contenido que conecta.
                <br />
                Musica que une.
                <br />
                Cultura que trasciende.
              </Text>
              <Text as="p" size="4" className="hero-description">
                Un ecosistema digital donde marketing, revista y eventos trabajan
                como una sola plataforma de movimiento cultural.
              </Text>
              <Flex wrap="wrap" gap="3" justify="center" className="hero-actions">
                <Button asChild size="4" className="button-red">
                  <Link href="#ecosistema">
                    Explorar ecosistema
                    <ArrowDown size={17} />
                  </Link>
                </Button>
                <Button asChild size="4" variant="surface" className="button-paper">
                  <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                    Trabajar con Santuario Marketing
                    <ArrowUpRight size={17} />
                  </a>
                </Button>
              </Flex>
            </Flex>
          </FadeIn>
        </RedFrame>
      </Container>
    </section>
  );
}
