import type { Metadata } from "next";
import { Works } from "@/components/Works";
import { site } from "@/content";

const title = `Works | ${site.name}`;
const description = `${site.name}のイベント出店・ケータリングの実績。音楽フェス「超PMAM」（幕張メッセ）への飲食出展など。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title,
    description,
    url: "/works",
    images: [{ url: "/works/cho-pmam_booth.jpg", width: 1108, height: 1477, alt: "超PMAM の野々ブース" }],
  },
};

export default function Page() {
  return <Works />;
}
