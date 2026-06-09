import Link from "next/link";
import { Button, Card, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const ctas = [
  { href: "/marketing", label: "Trabajar con Santuario Marketing" },
  { href: "/revista", label: "Proponer una historia" },
  { href: "/eventos", label: "Solicitar cobertura de evento" },
];

export function FinalCTA() {
  return (
    <section className="paper-section final-cta">
      <Container size="4">
        <FadeIn>
          <Flex direction="column" align="center" gap="4" className="final-cta-copy">
            <p className="section-kicker dark-text">Proxima pagina</p>
            <h2 className="final-title">
              DE LA REVISTA AL MOVIMIENTO.
            </h2>
            <Text as="p" className="final-copy">
              Trabajemos una marca, contemos una historia o documentemos una
              experiencia.
            </Text>
          </Flex>
        </FadeIn>

        <Grid columns={{ initial: "1", md: "3" }} gap="4" className="final-cta-grid">
          {ctas.map((cta) => (
            <Card key={cta.href} className="final-cta-card">
              <Button asChild variant="ghost" highContrast>
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
