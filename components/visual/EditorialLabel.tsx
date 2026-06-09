import { Text } from "@radix-ui/themes";

type EditorialLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function EditorialLabel({ children, className }: EditorialLabelProps) {
  return (
    <Text
      as="span"
      size="1"
      weight="bold"
      className={["editorial-label", className].filter(Boolean).join(" ")}
    >
      {children}
    </Text>
  );
}
