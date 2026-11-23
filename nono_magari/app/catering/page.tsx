import type { Metadata } from "next";
import { CateringLp } from "@/components/catering/CateringLp";
import { PageTracker } from "@/components/catering/PageTracker";
import { site } from "@/content";
import { catering } from "@/content/catering";

const { title, description } = catering.meta;
const image = catering.heroImage;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: catering.paths.lp },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title,
    description,
    url: catering.paths.lp,
    images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [image.src] },
};

export default function Page() {
  return (
    <>
      <PageTracker page="lp" />
      <CateringLp />
    </>
  );
}
