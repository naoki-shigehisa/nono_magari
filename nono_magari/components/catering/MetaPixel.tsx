import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/analytics";

/**
 * Meta ピクセルのタグ本体。/catering 以下の layout からだけ読み込む（広告の計測用）。
 * ID が未設定のときは何も出力しない（lib/analytics.ts を参照）。
 * 読み込み時にページ表示（PageView）を自動で送る。
 * GA4 はサイト全体で計測するので、components/GoogleAnalytics.tsx を app/layout.tsx から読み込んでいる。
 */
export function MetaPixel() {
  return (
    <>
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
