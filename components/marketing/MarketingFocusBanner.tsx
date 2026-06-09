import { ArrowRight } from "lucide-react";
import { marketingMethod } from "@/lib/marketing";

export function MarketingFocusBanner() {
  return (
    <section className="marketing-focus-banner">
      <div className="marketing-focus-symbol" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <polygon points="50 7 89 30 89 70 50 93 11 70 11 30" />
          <path d="M50 7 70 50 50 93 30 50 50 7ZM11 30 70 50 11 70M89 30 30 50 89 70" />
        </svg>
      </div>
      <div className="marketing-focus-copy">
        <p className="marketing-focus-eyebrow">Nuestro enfoque</p>
        <h2 className="marketing-focus-title">{marketingMethod.join(". ")}.</h2>
        <p className="marketing-focus-text">
          Un método integral que alinea tu marca, tu mensaje y tu mercado.
        </p>
      </div>
      <a href="#diagnostico" className="marketing-focus-arrow" aria-label="Agendar diagnóstico">
        <ArrowRight size={30} />
      </a>
    </section>
  );
}
