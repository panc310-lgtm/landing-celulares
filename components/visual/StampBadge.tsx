import { Text } from "@radix-ui/themes";

type StampBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function StampBadge({ children, className }: StampBadgeProps) {
  return (
    <Text
      as="span"
      size="2"
      weight="bold"
      className={["stamp-badge", className].filter(Boolean).join(" ")}
    >
      {children}
    </Text>
  );
}
