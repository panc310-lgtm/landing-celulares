type BackgroundGridProps = {
  className?: string;
};

export function BackgroundGrid({ className }: BackgroundGridProps) {
  return (
    <div
      aria-hidden="true"
      className={["background-grid", className].filter(Boolean).join(" ")}
    />
  );
}
