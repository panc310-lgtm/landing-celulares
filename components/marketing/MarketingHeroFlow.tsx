import type { CSSProperties } from "react";

const particles = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  x: 18 + ((index * 19) % 76),
  y: 12 + ((index * 31) % 70),
  delay: (index % 9) * 0.42,
  size: 2 + (index % 4),
}));

const streams = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  y: 73 + index * 3.6,
  delay: index * -0.65,
}));

export function MarketingHeroFlow() {
  return (
    <div className="marketing-hero-flow" aria-hidden="true">
      <div className="marketing-hero-flow-grid" />
      <div className="marketing-hero-flow-scan" />
      <div className="marketing-hero-flow-radial" />
      <div className="marketing-hero-flow-streams">
        {streams.map((stream) => (
          <span
            key={stream.id}
            className={`marketing-hero-flow-stream marketing-hero-flow-stream-${stream.id + 1}`}
            style={
              {
                "--stream-y": `${stream.y}%`,
                "--stream-delay": `${stream.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="marketing-hero-flow-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="marketing-hero-flow-particle"
            style={
              {
                "--particle-x": `${particle.x}%`,
                "--particle-y": `${particle.y}%`,
                "--particle-delay": `${particle.delay}s`,
                "--particle-size": `${particle.size}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
