type GlowOrbProps = {
  className?: string;
  tone?: "red" | "cyan" | "gold";
  color?: "red" | "cyan" | "gold";
  size?: "sm" | "md" | "lg";
};

export function GlowOrb({
  className,
  tone,
  color = "red",
  size = "md",
}: GlowOrbProps) {
  const orbTone = tone ?? color;

  return (
    <div
      aria-hidden="true"
      className={[
        "glow-orb",
        `glow-orb-${orbTone}`,
        `glow-orb-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
