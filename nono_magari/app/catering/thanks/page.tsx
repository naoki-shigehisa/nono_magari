import type { Metadata } from "next";
import { Fragment } from "react";
import { CateringHeader } from "@/components/catering/CateringHeader";
import { PageTracker } from "@/components/catering/PageTracker";
import { site } from "@/content";
import { catering } from "@/content/catering";

const title = `${catering.thanks.title.join("")} | ${site.name}`;

export const metadata: Metadata = {
  title,
  description: catering.meta.description,
  alternates: { canonical: catering.paths.thanks },
  robots: { index: false, follow: false },
  openGraph: { title, url: catering.paths.thanks },
};

/** 送信完了ページ。送信完了の計測は PageTracker が、送信済みの印があるときだけ行う */
export default function Page() {
  const { thanks } = catering;
  return (
    <main className="flex min-h-dvh flex-col">
      <PageTracker page="thanks" />
      <CateringHeader />
      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <h1 className="text-xl font-bold leading-[1.7] tracking-[0.16em]">
          {thanks.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p className="mt-8 text-[0.875rem] leading-[2.1] tracking-[0.06em]">
          {thanks.lines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
        <a
          href={site.instagram.url}
          rel="noopener noreferrer"
          aria-label={`Instagram ${site.instagram.handle}`}
          className="mt-10 inline-flex min-h-12 items-center rounded-full border border-current px-6 text-[0.9375rem] tracking-[0.12em] hover:opacity-85"
        >
          Instagram {site.instagram.handle}
        </a>
        <a
          href={catering.paths.lp}
          className="mt-4 inline-flex min-h-11 items-center px-3 text-[0.8125rem] tracking-[0.08em] underline underline-offset-4 decoration-current/40"
        >
          {thanks.back}
        </a>
      </div>
    </main>
  );
}
