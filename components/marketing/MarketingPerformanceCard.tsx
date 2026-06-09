import { ChevronDown } from "lucide-react";

export function MarketingPerformanceCard() {
  return (
    <aside className="marketing-performance-card">
      <div className="marketing-performance-header">
        <span>Rendimiento acumulado</span>
        <span>
          Últimos 90 días
          <ChevronDown size={13} />
        </span>
      </div>
      <div className="marketing-performance-body">
        <div>
          <strong className="marketing-performance-value">+238%</strong>
          <p>
            Crecimiento promedio
            <br />
            en conversiones
          </p>
        </div>
        <div className="marketing-performance-chart" aria-hidden="true">
          <svg viewBox="0 0 220 140" role="img">
            <defs>
              <linearGradient id="marketingChartGlow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ff5a00" stopOpacity="0.45" />
                <stop offset="1" stopColor="#ff5a00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M22 118 L22 18 M22 118 L204 118"
              className="marketing-chart-axis"
            />
            <path
              d="M24 108 C46 92 54 106 70 88 C90 66 100 78 116 50 C135 20 148 48 166 42 C184 36 188 32 204 14 L204 118 L24 118 Z"
              fill="url(#marketingChartGlow)"
            />
            <polyline
              points="24,108 44,94 62,102 78,82 96,74 116,46 134,32 152,44 170,42 188,30 204,14"
              className="marketing-chart-line"
            />
            <circle cx="24" cy="108" r="4" />
            <circle cx="116" cy="46" r="4" />
            <circle cx="204" cy="14" r="5" />
          </svg>
          <div className="marketing-performance-months">
            <span>MAY</span>
            <span>JUN</span>
            <span>JUL</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
