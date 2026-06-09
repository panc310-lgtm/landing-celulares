import { TrendingUp, Users } from "lucide-react";

type MarketingStatCardProps = {
  value: string;
  label: string;
  icon?: string;
};

export function MarketingStatCard({ value, label, icon }: MarketingStatCardProps) {
  const Icon = icon === "users" ? Users : TrendingUp;

  return (
    <div className="marketing-stat-card">
      <span className="marketing-stat-icon">
        <Icon size={22} />
      </span>
      <span>
        <strong className="marketing-stat-value">{value}</strong>
        <span className="marketing-stat-label">{label}</span>
      </span>
    </div>
  );
}
