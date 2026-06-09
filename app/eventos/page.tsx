import Link from "next/link";
import { Button, Container, Text } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";

export default function EventosPage() {
  return (
    <main className="branch-page branch-placeholder">
      <Container size="3" className="branch-placeholder-inner">
        <Text as="p" className="section-kicker">
          Linea experiencial
        </Text>
        <h1 className="branch-title">SANTUARIO EVENTOS</h1>
        <Text as="p" className="branch-claim">
          Recaps, cobertura y memoria audiovisual de los espacios donde ocurre el
          movimiento.
        </Text>
        <Button asChild size="4" className="button-red">
          <Link href="/">
            <ArrowLeft size={18} />
            Volver al lobby
          </Link>
        </Button>
      </Container>
    </main>
  );
}
