type PaperTextureProps = {
  children: React.ReactNode;
  className?: string;
};

export function PaperTexture({ children, className }: PaperTextureProps) {
  return (
    <div className={["paper-texture", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
