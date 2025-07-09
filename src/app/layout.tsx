import type { Metadata } from "next";
import "./globals.css";
import "@vapor-ui/core/styles.css";

export const metadata: Metadata = {
  title: "모다모영",
  description: "모다모영",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
