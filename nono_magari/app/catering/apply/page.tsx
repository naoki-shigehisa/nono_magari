import type { Metadata } from "next";
import { ApplyForm } from "@/components/catering/ApplyForm";
import { DmCta, FormDirectLink } from "@/components/catering/Cta";
import { PageTracker } from "@/components/catering/PageTracker";
import { site } from "@/content";
import { catering } from "@/content/catering";

const title = `${catering.apply.title} | 季節のお弁当ケータリング | ${site.name}`;

export const metadata: Metadata = {
  title,
  description: catering.meta.description,
  alternates: { canonical: catering.paths.apply },
  robots: { index: false, follow: false },
  openGraph: { title, url: catering.paths.apply },
};

/**
 * 申込みページ。Google フォームを、ヘッダーを除いた画面の高さいっぱいに埋め込む。
 * フォームの高さは外から取れないので、iframe の中でスクロールさせる。
 */
export default function Page() {
  const { apply } = catering;
  return (
    <main className="flex h-dvh flex-col">
      <PageTracker page="apply" />
      <div className="mx-auto flex w-full max-w-[640px] items-center justify-between gap-3 px-4 py-2">
        <div>
          <h1 className="text-base tracking-[0.2em]">
            {/* タグが読み込み時にページ表示を送るので、ページ間はふつうのリンクで読み込み直す */}
            <a href={catering.paths.lp} aria-label="お弁当のページへ戻る" className="mr-2 inline-block py-2 pr-1 opacity-80">
              ←
            </a>
            {apply.title}
          </h1>
          <p className="text-[0.6875rem] leading-[1.6] tracking-[0.04em]">
            {apply.fallbackLead}
            <FormDirectLink position="apply" className="inline-block py-1 underline underline-offset-4">
              {apply.fallbackLink}
            </FormDirectLink>
          </p>
        </div>
        <DmCta position="apply" className="shrink-0 !min-h-11 !px-3 !text-xs">
          {catering.cta.dmShort}
        </DmCta>
      </div>
      <ApplyForm />
    </main>
  );
}
