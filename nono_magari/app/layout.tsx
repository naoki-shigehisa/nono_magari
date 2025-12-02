import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Shippori_Mincho, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Zen_Kaku_Gothic_New({
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const serif = Shippori_Mincho({
  variable: "--font-serif",
  weight: ["500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "野々",
  description: "不定期で間借り営業を行っている朝ごはん屋です。『一日のはじまりに、余白とやすらぎを』をコンセプトに、旬の食材をやさしく調理。今後は日本酒を中心とした夜の居酒屋営業も予定しています。",
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
    shortcut: "/favicon.jpg",
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
        className={`${geistSans.variable} ${serif.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "野々",
              description:
                "不定期で間借り営業を行っている朝ごはん屋です。『一日のはじまりに、余白とやすらぎを』をコンセプトに、旬の食材をやさしく調理。今後は日本酒を中心とした夜の居酒屋営業も予定しています。",
              image: [
                "/favicon.jpg"
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "宮前5-9-8 okatte にしおぎ",
                addressLocality: "杉並区",
                addressRegion: "東京都",
                postalCode: "168-0081",
                addressCountry: "JP",
              },
              url: "https://www.nono-magari.com",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "10:00",
                  closes: "13:00",
                },
              ],
              "servesCuisine": "Japanese",
              "priceRange": "¥1,000 - ¥2,000",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
