"use client";

import Link from "next/link";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import { motion } from "motion/react";

type EcosystemTone = "marketing" | "revista" | "eventos";

type EcosystemCardProps = {
  title: string;
  label: string;
  description: string;
  href: string;
  tags: string[];
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
  featured = false,
  tone,
}: EcosystemCardProps) {
  return (
    <Link href={href} className="block h-full no-underline">
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Card className={cardClassName(tone, featured)}>
          <Flex direction="column" gap="4" height="100%">
            <Flex align="center" justify="between" gap="3">
              <Badge variant="soft" className="ecosystem-card__label">
                {label}
              </Badge>
              {featured ? (
                <Badge variant="solid" className="ecosystem-card__featured">
                  Featured
                </Badge>
              ) : null}
            </Flex>

            <Flex direction="column" gap="2">
              <Text as="p" size="6" weight="bold" className="ecosystem-card__title">
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
          </Flex>
        </Card>
      </motion.div>
    </Link>
  );
}
