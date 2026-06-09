type SideEditorialTextProps = {
  side: "left" | "right";
};

export function SideEditorialText({ side }: SideEditorialTextProps) {
  const text =
    side === "left"
      ? "CONTENIDO QUE CONECTA"
      : "MUSICA QUE UNE · CULTURA QUE TRASCIENDE";

  return (
    <div className={`side-editorial-text side-editorial-text-${side}`}>
      {text}
    </div>
  );
}
