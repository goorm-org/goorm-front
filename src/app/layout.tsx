import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@vapor-ui/core/styles.css";
import { SWRProvider } from "./_providers/swr-provider";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className="bg-gray-100 max-w-[393px] mx-auto h-dvh">
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
