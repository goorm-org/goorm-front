import "./globals.css";
import type { Metadata } from "next";
import { SWRProvider } from "./_providers/swr-provider";
import Navigation from "@/app/_components/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "JEJU GO",
  description: "Short-form Travel Planner for Foreign Tourists in Jeju Island",
  openGraph: {
    title: "JEJU GO",
    description:
      "Short-form Travel Planner for Foreign Tourists in Jeju Island",
    url: "https://jejugo.vercel.app",
    siteName: "Jeju Go",
    images: [
      {
        url: "/jejugo_ogimg.png",
        width: 1200,
        height: 630,
        alt: "Jeju Go",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
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
