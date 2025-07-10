import { Suspense } from "react";
import type { Metadata } from "next";
import { SWRProvider } from "./_providers/swr-provider";
import { headers } from "next/headers";
import "./globals.css";
import "@vapor-ui/core/styles.css";
import Navigation from "@/app/_components/navigation";

export const metadata: Metadata = {
  title: "모다모영",
  description: "모다모영",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const EXCLUDE_NAVIGATION_PATHS = ["/onboarding", "/plan", "/saved"];

  const isExcludeNavigation = EXCLUDE_NAVIGATION_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === "/"
  );

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
              {!isExcludeNavigation && <Navigation />}
            </main>
          </SWRProvider>
        </Suspense>
      </body>
    </html>
  );
}
