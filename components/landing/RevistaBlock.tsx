import { Card, Container, Grid, Text } from "@radix-ui/themes";
import { revistaCategories, revistaIssues } from "@/lib/revista";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { MotionCard } from "@/components/motion/MotionCard";
import { EditorialLabel } from "@/components/visual/EditorialLabel";
import { PaperTexture } from "@/components/visual/PaperTexture";

export function RevistaBlock() {
  return (
    <section className="paper-section revista-block">
      <Container size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
          <FadeIn>
            <PaperTexture className="revista-cover">
              <EditorialLabel>VOL. 03 / PAG. 01</EditorialLabel>
              <h2 className="magazine-title">
                LA CALLE ES NUESTRO ESCENARIO.
              </h2>
              <Text as="p" className="magazine-copy">
                Leemos lo que esta pasando en la cultura, la musica y las marcas
                antes de que se vuelva tendencia.
              </Text>
            </PaperTexture>
          </FadeIn>

          <div>
            <FadeIn>
              <p className="section-kicker dark-text">SANTUARIOWAV Revista</p>
              <h2 className="section-title dark-text">
                Revista cultural premium, no blog generico.
              </h2>
            </FadeIn>

            <StaggerContainer className="revista-grid">
              {revistaCategories.map((category) => (
                <MotionCard key={category}>
                  <Card className="revista-card">
                    <Text as="p" size="3" weight="bold">
                      {category}
                    </Text>
                  </Card>
                </MotionCard>
              ))}
            </StaggerContainer>

            <Grid columns={{ initial: "1", sm: "2" }} gap="4" className="issue-grid">
              {revistaIssues.map((issue) => (
                <Card key={issue.title} className="issue-card">
                  <EditorialLabel>{issue.label}</EditorialLabel>
                  <Text as="p" size="4" weight="bold">
                    {issue.title}
                  </Text>
                  <Text as="p" size="1">
                    {issue.page}
                  </Text>
                </Card>
              ))}
            </Grid>
          </div>
        </Grid>
      </Container>
    </section>
  );
}
