import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

/**
 * GA4 のタグ本体。app/layout.tsx から読み込み、サイト全体を計測する。
 * 測定 ID（NEXT_PUBLIC_GA_MEASUREMENT_ID）が未設定のときは何も出力しない。
 * ページ表示（page_view）は、読み込み時にタグが自動で送る。ページを読み込み直さない移動
 * （トップ ⇄ /works など）は、GA4 の拡張計測機能「ブラウザの履歴イベントに基づくページの変更」
 * （初期設定でオン）が送る。
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
