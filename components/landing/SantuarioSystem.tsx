import { Card, Container, Grid, Text } from "@radix-ui/themes";
import { FadeIn } from "@/components/motion/FadeIn";
import { EditorialLabel } from "@/components/visual/EditorialLabel";

const systemNodes = [
  { title: "Marketing", value: "Conversion" },
  { title: "Revista", value: "Cultura" },
  { title: "Eventos", value: "Comunidad" },
];

export function SantuarioSystem() {
  return (
    <section className="dark-section system-block">
      <Container size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
          <FadeIn>
            <div>
              <p className="section-kicker">Sistema Santuario</p>
              <h2 className="section-title">
                UN SOLO ECOSISTEMA.
                <br />
                TRES FORMAS DE MOVER CULTURA.
              </h2>
              <p className="section-description">
                Marketing convierte. Revista interpreta. Eventos conectan.
                SANTUARIOWAV une contenido, comunidad y estrategia en una
                plataforma cultural con capacidad comercial.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="system-diagram">
              <Card className="system-center">
                <EditorialLabel>Centro</EditorialLabel>
                <Text as="p" size="5" weight="bold">
                  SANTUARIOWAV
                </Text>
              </Card>
              {systemNodes.map((node, index) => (
                <Card key={node.title} className={`system-node system-node-${index + 1}`}>
                  <Text as="p" size="2" weight="bold">
                    {node.title}
                  </Text>
                  <Text as="p" size="1">
                    {node.value}
                  </Text>
                </Card>
              ))}
            </div>
          </FadeIn>
        </Grid>
      </Container>
    </section>
  );
}
