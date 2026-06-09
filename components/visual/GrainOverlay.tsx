type GrainOverlayProps = {
  fixed?: boolean;
  className?: string;
};

export function GrainOverlay({ fixed = false, className }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "grain-overlay",
        fixed && "grain-overlay-fixed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
