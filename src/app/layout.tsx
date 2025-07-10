import "./globals.css";
import type { Metadata } from "next";
import { SWRProvider } from "./_providers/swr-provider";
import Navigation from "@/app/_components/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "모다모영",
  description: "모다모영",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className="relative bg-primary-50">
        <Suspense fallback={null}>
          <SWRProvider>
            <main className="bg-background-2 max-w-[393px] mx-auto h-dvh">
              {children}
              <Navigation />
            </main>
          </SWRProvider>
        </Suspense>
      </body>
    </html>
  );
}
