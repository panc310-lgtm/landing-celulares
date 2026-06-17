import Image from "next/image";
import { rostroReferences } from "./MarketingCharacterMaterials";

export function MarketingCharacterFallback() {
  return (
    <div className="marketing-subject-fallback">
      <Image
        src={rostroReferences.primary}
        alt="Sujeto de Santuario Marketing con traje beige, cabello negro y expresión seria"
        fill
        priority
        sizes="(max-width: 1099px) 90vw, 610px"
      />
    </div>
  );
}
