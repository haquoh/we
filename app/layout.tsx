import type { Metadata } from "next";
import "./globals.css";
import TodaysMemory from "@/components/ui/TodaysMemory";
import AnniversaryAlert from "@/components/ui/AnniversaryAlert";
import HeartParticles from "@/components/ui/HeartParticles";
import MapMusicControl from "@/components/ui/MapMusicControl";

export const metadata: Metadata = {
  title: "우리의 추억 지도",
  description: "소중한 순간들을 지도에 담아",
  keywords: ["추억", "지도", "커플", "데이트", "여행"],
  authors: [{ name: "Our Love Story" }],
  openGraph: {
    title: "우리의 추억 지도",
    description: "소중한 순간들을 지도에 담아",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning className="font-sans antialiased">
        <main>
          {children}
        </main>
        <TodaysMemory />
        <AnniversaryAlert />
        <HeartParticles />
        <MapMusicControl />
      </body>
    </html>
  );
}
