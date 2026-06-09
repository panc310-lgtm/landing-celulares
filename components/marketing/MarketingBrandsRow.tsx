import { marketingBrands } from "@/lib/marketing";

export function MarketingBrandsRow() {
  return (
    <div className="marketing-brands">
      <p className="marketing-brands-label">Confianza de marcas que crecen</p>
      <div className="marketing-brands-list">
        {marketingBrands.map((brand) => (
          <span key={brand} className="marketing-brand-item">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
