import { Shippori_Mincho } from "next/font/google";
import { AnalyticsScripts } from "@/components/catering/AnalyticsScripts";

/**
 * /catering 以下（弁当ケータリングの LP）だけに効く設定。
 * 広告のクリエイティブに合わせた明朝体と、計測タグをここで読み込む。
 * トップや /works には影響しない。
 */
const mincho = Shippori_Mincho({
  variable: "--font-catering-mincho",
  weight: ["400", "700"],
  display: "swap",
  // 日本語フォントは文字の範囲ごとに分割して配信され、ページで使う文字の分だけ読み込まれる
  preload: false,
});

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${mincho.variable} min-h-dvh bg-[#84573a] text-[#fbf7ea]`}
      style={{
        fontFamily:
          'var(--font-catering-mincho), "Hiragino Mincho ProN", "Yu Mincho", "YuMincho", serif',
        // 本文サイトの詰め組み（palt）を外し、CR と同じゆったりした字送りにする
        fontFeatureSettings: "normal",
      }}
    >
      {children}
      <AnalyticsScripts />
    </div>
  );
}
