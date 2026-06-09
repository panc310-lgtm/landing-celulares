import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function HeroActions() {
  return (
    <Flex className="hero-actions" align="center" justify="center" wrap="wrap">
      <Button asChild size="4" variant="surface" className="hero-action-outline">
        <Link href="/marketing">
          Explorar ecosistema
          <ArrowRight size={17} />
        </Link>
      </Button>
      <Button asChild size="4" className="hero-action-red">
        <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
          Trabajar con Santuario Marketing
          <ArrowRight size={17} />
        </a>
      </Button>
    </Flex>
  );
}
