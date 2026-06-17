import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { ArrowRight, PlayCircle } from "lucide-react";
import { marketingStats } from "@/lib/marketing";
import { MarketingBrandsRow } from "./MarketingBrandsRow";
import { MarketingStatCard } from "./MarketingStatCard";

export function MarketingHeroCopy() {
  return (
    <div className="marketing-hero-copy">
      <p className="marketing-hero-kicker">MÓDULO: SANTUARIO MARKETING</p>

      <h1 className="marketing-hero-title">
        <span>NO ES SOLO</span>
        <span>CONTENIDO.</span>
        <span className="marketing-hero-title-accent accent">ES UNA</span>
        <span className="marketing-hero-title-accent accent">ESTRUCTURA.</span>
      </h1>

      <p className="marketing-hero-subcopy">
        Creamos sistemas de contenido para marcas que necesitan{" "}
        <strong>presencia</strong>, <strong>confianza</strong> y{" "}
        <strong>conversión</strong>.
      </p>

      <div className="marketing-hero-actions">
        <Button asChild size="4" radius="full" className="marketing-primary-button">
          <Link href="#diagnostico">
            Agendar diagnóstico
            <ArrowRight size={18} />
          </Link>
        </Button>
        <Button
          asChild
          size="4"
          radius="full"
          variant="surface"
          className="marketing-secondary-button"
        >
          <Link href="#enfoque">
            <PlayCircle size={20} />
            Ver cómo funciona
          </Link>
        </Button>
      </div>

      <div className="marketing-stats-row">
        {marketingStats.map((stat) => (
          <MarketingStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <MarketingBrandsRow />
    </div>
  );
}
