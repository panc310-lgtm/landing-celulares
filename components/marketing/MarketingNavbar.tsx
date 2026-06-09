import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const navItems = ["Sistema Santuario", "Casos", "Recursos", "Nosotros"];

export function MarketingNavbar() {
  return (
    <header className="marketing-navbar">
      <Link href="/marketing" className="marketing-navbar-brand">
        <span className="marketing-logomark" aria-hidden="true">
          <span />
        </span>
        <span>
          <strong>SANTUARIO MARKETING</strong>
          <small>by SANTUARIOWAV</small>
        </span>
      </Link>

      <nav className="marketing-navbar-center" aria-label="Marketing navigation">
        <Link href="/marketing" className="marketing-nav-service">
          Servicios
          <ChevronDown size={14} />
        </Link>
        {navItems.map((item) => (
          <Link key={item} href="/marketing">
            {item}
          </Link>
        ))}
      </nav>

      <Link href="#diagnostico" className="marketing-navbar-cta">
        Agendar diagnóstico
        <ArrowRight size={16} />
      </Link>
    </header>
  );
}
