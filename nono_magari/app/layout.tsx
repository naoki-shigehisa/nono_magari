import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import { content, site } from "@/content";

const geistSans = Noto_Sans_JP({
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${site.name} | ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    images: [
      {
        url: site.ogImage.src,
        width: site.ogImage.width,
        height: site.ogImage.height,
        alt: site.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [site.ogImage.src],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
};

/** ページの写真を構造化データ用に絶対 URL にする */
const absolute = (path: string) => new URL(path, site.url).toString();

/**
 * schema.org の構造化データ。
 * 朝ごはん屋「野々」を Restaurant、夜の「野々酒場」をその department として表現する。
 * 営業日が不定期なので営業時間は入れず、住所・最寄り駅・SNS を中心に持たせる。
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "ja",
    },
    {
      "@type": "Restaurant",
      "@id": `${site.url}/#restaurant`,
      name: site.name,
      alternateName: [`${site.name} 間借り朝ごはん`, "nono_magari"],
      description: site.description,
      url: site.url,
      image: [absolute(site.ogImage.src), absolute("/nono_3.jpg"), absolute("/favicon.jpg")],
      logo: absolute("/nono_logo.png"),
      sameAs: [site.instagram.url],
      address: {
        "@type": "PostalAddress",
        ...site.address,
      },
      hasMap: site.venue.mapUrl,
      containedInPlace: {
        "@type": "Place",
        name: site.venue.name,
        address: { "@type": "PostalAddress", ...site.address },
      },
      servesCuisine: ["和食", "Japanese"],
      priceRange: "¥1,000 - ¥2,000",
      hasMenu: site.url,
      slogan: content.morning.concepts[0]?.title,
      department: {
        "@type": "BarOrPub",
        name: content.night.info.name,
        description: content.night.concepts.map((c) => c.lines.join("")).join(" "),
        servesCuisine: ["和食", "Japanese"],
        sameAs: [site.instagram.url],
        address: { "@type": "PostalAddress", ...site.address },
      },
    },
  ],
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
            // "<" を < にして、文中に </script> が現れても壊れないようにする
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
