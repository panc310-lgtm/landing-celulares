import Link from "next/link";
import { Container, Flex, Text } from "@radix-ui/themes";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container size="4">
        <Flex direction={{ initial: "column", md: "row" }} justify="between" gap="5">
          <div>
            <Text as="p" size="7" weight="bold" className="footer-brand">
              {siteConfig.name}
            </Text>
            <Text as="p" size="2" className="footer-copy">
              Marketing, revista y eventos conectados en una plataforma cultural.
            </Text>
          </div>

          <Flex wrap="wrap" gap="4" align="center" className="footer-links">
            <Link href="/marketing">Marketing</Link>
            <Link href="/revista">Revista</Link>
            <Link href="/eventos">Eventos</Link>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
}
