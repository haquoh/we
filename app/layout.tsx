import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import TodaysMemory from "@/components/ui/TodaysMemory";
import AnniversaryAlert from "@/components/ui/AnniversaryAlert";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import HeartParticles from "@/components/ui/HeartParticles";

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning className="font-sans antialiased">
        <main className="pb-16">
          {children}
        </main>
        <BottomNav />
        <TodaysMemory />
        <AnniversaryAlert />
        <BackgroundMusic />
        <DarkModeToggle />
        <HeartParticles />
      </body>
    </html>
  );
}
