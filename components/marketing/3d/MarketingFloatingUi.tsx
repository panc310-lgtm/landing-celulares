import { ChartNoAxesCombined, FileText, ShieldCheck } from "lucide-react";

const widgets = [
  {
    title: "Contenido",
    text: "Narrativas, piezas y dirección visual.",
    icon: FileText,
  },
  {
    title: "Confianza",
    text: "Autoridad, consistencia y percepción.",
    icon: ShieldCheck,
  },
  {
    title: "Conversión",
    text: "Recorridos claros orientados a resultado.",
    icon: ChartNoAxesCombined,
  },
];

export function MarketingFloatingUi() {
  return (
    <div className="marketing-floating-ui" aria-hidden="true">
      {widgets.map((widget, index) => {
        const Icon = widget.icon;

        return (
          <article
            key={widget.title}
            className={`marketing-floating-ui__card marketing-floating-ui__card-${index + 1}`}
          >
            <span className="marketing-floating-ui__icon">
              <Icon size={18} />
            </span>
            <strong>{widget.title}</strong>
            <p>{widget.text}</p>
          </article>
        );
      })}
    </div>
  );
}
