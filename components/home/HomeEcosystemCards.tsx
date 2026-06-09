import { homeEcosystemCards } from "@/lib/home-ecosystem";
import { HomeEcosystemCard } from "./HomeEcosystemCard";

export function HomeEcosystemCards() {
  return (
    <div className="home-cards-stage" aria-label="Líneas del ecosistema">
      {homeEcosystemCards.map((card, index) => (
        <HomeEcosystemCard key={card.id} card={card} index={index} />
      ))}
    </div>
  );
}
