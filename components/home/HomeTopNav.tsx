import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Ecosistema", href: "/" },
  { label: "Nosotros", href: "/revista" },
  { label: "Manifiesto", href: "/eventos" },
  { label: "Contacto", href: `mailto:${siteConfig.email}` },
];

export function HomeTopNav() {
  return (
    <header className="home-top-nav">
      <Link href="/" className="home-brand" aria-label="SANTUARIOWAV inicio">
        <span className="home-brand-main">
          SANTUARIO<span>WAV</span>
        </span>
        <span className="home-brand-sub">{siteConfig.subtitle}</span>
      </Link>

      <nav className="home-nav-links" aria-label="Navegación principal">
        {navItems.map((item, index) => (
          <Link key={item.label} href={item.href}>
            {index === 0 ? <span aria-hidden="true">•</span> : null}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="home-nav-meta" aria-label="Edición">
        <span>VOL. 01</span>
        <small>PÁG. 01</small>
        <button className="home-menu-button" type="button" aria-label="Abrir menú">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}
