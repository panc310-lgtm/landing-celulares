import Link from "next/link";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/marketing", label: "Marketing" },
  { href: "/revista", label: "Revista" },
  { href: "/eventos", label: "Eventos" },
];

export function Navbar() {
  return (
    <header className="site-navbar">
      <Container size="4">
        <Flex align="center" justify="between" gap="4" className="site-nav-inner">
          <Link href="/" className="site-logo" aria-label="SANTUARIOWAV home">
            <span className="site-logo-mark">SW</span>
            <span>{siteConfig.name}</span>
          </Link>

          <nav className="site-nav-links" aria-label="Navegacion principal">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild className="site-nav-cta">
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
              <Text as="span">Trabajemos</Text>
              <ArrowUpRight size={16} />
            </a>
          </Button>
        </Flex>
      </Container>
    </header>
  );
}
