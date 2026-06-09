import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./home.css";
import "./marketing.css";

export const metadata: Metadata = {
  title: "SANTUARIOWAV | Ecosistema digital",
  description:
    "Marketing, revista digital y eventos conectados en una plataforma cultural.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Theme
          appearance="dark"
          accentColor="red"
          grayColor="mauve"
          radius="large"
          scaling="95%"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
