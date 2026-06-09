import { ArrowDown, Mouse } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="marketing-scroll-indicator" aria-hidden="true">
      <span className="marketing-scroll-dot">
        <Mouse size={16} />
      </span>
      <span className="marketing-scroll-text">Scroll para explorar</span>
      <ArrowDown className="marketing-scroll-arrow" size={18} />
    </div>
  );
}
