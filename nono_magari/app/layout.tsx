import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content";

const geistSans = Noto_Sans_JP({
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: site.name,
              description: site.description,
              image: [
                "/favicon.jpg"
              ],
              address: {
                "@type": "PostalAddress",
                ...site.address,
              },
              url: site.url,
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
