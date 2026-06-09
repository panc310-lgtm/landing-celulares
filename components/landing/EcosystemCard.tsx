"use client";

import Link from "next/link";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import { ArrowUpRight } from "lucide-react";
import { MotionCard } from "@/components/motion/MotionCard";
import { EditorialLabel } from "@/components/visual/EditorialLabel";

type EcosystemTone = "marketing" | "revista" | "eventos";

type EcosystemCardProps = {
  title: string;
  label: string;
  description: string;
  href: string;
  tags: string[];
  cta: string;
  eyebrow: string;
  statement: string;
  marker: string;
  featured?: boolean;
  tone: EcosystemTone;
};

function cardClassName(tone: EcosystemTone, featured: boolean) {
  return [
    "ecosystem-card",
    `ecosystem-card-${tone}`,
    featured && "ecosystem-card-featured",
  ]
    .filter(Boolean)
    .join(" ");
}

export function EcosystemCard({
  title,
  label,
  description,
  href,
  tags,
  cta,
  eyebrow,
  statement,
  marker,
  featured = false,
  tone,
}: EcosystemCardProps) {
  return (
    <Link href={href} className="ecosystem-card-link">
      <MotionCard className="h-full">
        <Card className={cardClassName(tone, featured)}>
          <Flex direction="column" gap="4" height="100%">
            <Flex align="center" justify="between" gap="3">
              <Badge variant="soft" className="ecosystem-card__label">
                {label}
              </Badge>
              <EditorialLabel>{marker}</EditorialLabel>
            </Flex>

            <Text as="p" size="1" className="ecosystem-card__eyebrow">
              {eyebrow}
            </Text>

            <Flex direction="column" gap="2">
              <Text as="p" size="7" weight="bold" className="ecosystem-card__statement">
                {statement}
              </Text>
              <Text as="p" size="4" weight="bold" className="ecosystem-card__title">
                {title}
              </Text>
              <Text as="p" size="3" className="ecosystem-card__description">
                {description}
              </Text>
            </Flex>

            <Flex wrap="wrap" gap="2" className="mt-auto">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="ecosystem-card__tag">
                  {tag}
                </Badge>
              ))}
            </Flex>

            <Flex align="center" justify="between" gap="3" className="ecosystem-card__cta">
              <Text as="span" size="2" weight="bold">
                {cta}
              </Text>
              <ArrowUpRight size={18} />
            </Flex>
          </Flex>
        </Card>
      </MotionCard>
    </Link>
  );
}
