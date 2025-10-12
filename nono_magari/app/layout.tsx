import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "野々",
  description: "一日のはじまりに、余白とやすらぎを。旬の食材、心地よい空間、素材の味を大切に。東京の真ん中で、やさしい朝ごはんをどうぞ。",
  icons: {
    icon: "/nono_logo.jpg",
    apple: "/nono_logo.jpg",
    shortcut: "/nono_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
