import { marketingFeatures } from "@/lib/marketing";
import { MarketingFeatureCard } from "./MarketingFeatureCard";

export function MarketingFloatingCards() {
  return (
    <div className="marketing-floating-cards" aria-label="Pilares de Santuario Marketing">
      {marketingFeatures.map((feature, index) => (
        <MarketingFeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          index={index}
        />
      ))}
    </div>
  );
}
