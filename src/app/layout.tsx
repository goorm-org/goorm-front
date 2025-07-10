import { Suspense } from "react";
import type { Metadata } from "next";
import clsx from "clsx";
import { headers } from "next/headers";
import "./globals.css";
import "@vapor-ui/core/styles.css";
import { SWRProvider } from "./_providers/swr-provider";
import Navigation from "@/components/Navigation";

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
  // explore 페이지는 네비게이션 미노출
  const isExplorePage = pathname.startsWith("/explore");

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className="relative">
        <SWRProvider>
          <main className={clsx("bg-primary-50 max-w-[393px] mx-auto h-dvh")}>
            {children}
          </main>
          <Suspense fallback={null}>
            {!isExplorePage && <Navigation />}
          </Suspense>
        </SWRProvider>
      </body>
    </html>
  );
}
