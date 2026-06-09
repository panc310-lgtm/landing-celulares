type RedFrameProps = {
  children?: React.ReactNode;
  className?: string;
};

export function RedFrame({ children, className }: RedFrameProps) {
  return (
    <div className={["red-frame", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
