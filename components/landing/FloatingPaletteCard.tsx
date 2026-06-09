"use client";

import Link from "next/link";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import { ArrowRight, BookOpen, CalendarDays, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { EcosystemCard } from "@/lib/ecosystem";
import { EditorialLabel } from "@/components/visual/EditorialLabel";

type FloatingPaletteCardProps = {
  card: EcosystemCard;
  position: "left" | "center" | "right";
  onCursorChange?: (card: EcosystemCard | null) => void;
};

const icons = {
  marketing: TrendingUp,
  revista: BookOpen,
  eventos: CalendarDays,
};

export function FloatingPaletteCard({
  card,
  position,
  onCursorChange,
}: FloatingPaletteCardProps) {
  const Icon = icons[card.tone];
  const isCenter = position === "center";
  const reduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 22 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const intensity = isCenter ? 16 : 11;

    rotateXValue.set(y * -intensity);
    rotateYValue.set(x * intensity);
  }

  function handleMouseLeave() {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }

  return (
    <div
      className={`palette-position palette-position-${position} palette-position-${card.tone}`}
    >
      <div className={`palette-cast-shadow palette-cast-shadow-${position}`} />
      <Link
        href={card.href}
        aria-label={`${card.title}: ${card.cta}`}
        className={`floating-palette floating-palette-${position}`}
        onFocus={() => onCursorChange?.(card)}
        onBlur={() => onCursorChange?.(null)}
      >
        <motion.div
          onPointerEnter={() => onCursorChange?.(card)}
          onPointerLeave={() => onCursorChange?.(null)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ y: isCenter ? -18 : -12, scale: isCenter ? 1.045 : 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="floating-palette-motion"
        >
          <Card className={`palette-card palette-card-${card.tone}`}>
            <div className="palette-depth-edge" />
            <div className={`palette-visual palette-visual-${card.tone}`} />
            <div className={`palette-art palette-art-${card.tone}`}>
              {card.tone === "marketing" ? (
                <>
                  <span className="marketing-lens" />
                  <span className="marketing-panel marketing-panel-a" />
                  <span className="marketing-panel marketing-panel-b" />
                  <span className="marketing-meter" />
                </>
              ) : null}
              {card.tone === "revista" ? (
                <>
                  <span className="revista-red-cut" />
                  <span className="revista-photo" />
                  <span className="revista-stamp" />
                  <span className="revista-fold" />
                </>
              ) : null}
              {card.tone === "eventos" ? (
                <>
                  <span className="eventos-video" />
                  <span className="eventos-light eventos-light-a" />
                  <span className="eventos-light eventos-light-b" />
                  <span className="eventos-crowd" />
                </>
              ) : null}
            </div>
            <Flex direction="column" gap="4" className="palette-card-content">
              <Flex justify="between" align="start" gap="3" className="palette-layer palette-layer-top">
                <div className="palette-label-stack">
                  <EditorialLabel>{card.label}</EditorialLabel>
                  {card.tone === "revista" ? (
                    <Flex gap="2" className="palette-paper-meta">
                      <span>VOL. 03</span>
                      <span>PAG. 01</span>
                    </Flex>
                  ) : null}
                </div>
                <span className="palette-icon">
                  <Icon size={22} />
                </span>
              </Flex>

              <Text as="p" size="1" className="palette-eyebrow palette-layer palette-layer-mid">
                {card.eyebrow}
              </Text>

              <div className="palette-layer palette-layer-title">
                <Text as="p" className="palette-title">
                  {card.title}
                </Text>
                <Text as="p" className="palette-headline">
                  {card.headline}
                  {card.tone === "eventos" ? (
                    <>
                      <br />
                      De la noche al movimiento.
                    </>
                  ) : null}
                </Text>
                <Text as="p" size="2" className="palette-description">
                  {card.description}
                </Text>
              </div>

              <Flex wrap="wrap" gap="2" className="palette-tags palette-layer palette-layer-mid">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="palette-tag">
                    {tag}
                  </Badge>
                ))}
              </Flex>

              <Flex align="center" justify="between" className="palette-cta palette-layer palette-layer-cta">
                <Text as="span" size="2" weight="bold">
                  {card.cta}
                </Text>
                <ArrowRight size={18} />
              </Flex>
            </Flex>
          </Card>
        </motion.div>
      </Link>
    </div>
  );
}
