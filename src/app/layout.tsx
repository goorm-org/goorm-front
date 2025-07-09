import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-gray-100 max-w-[393px] mx-auto">{children}</body>
    </html>
  );
}
