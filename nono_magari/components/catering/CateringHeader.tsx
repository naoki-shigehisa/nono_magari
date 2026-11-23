import Image from "next/image";
import Link from "next/link";
import { site } from "@/content";

/**
 * ロゴだけの簡素なヘッダー（出口を減らすため、グローバルナビは出さない）。
 * ロゴ画像（1440×1920）は余白が大きいので、文字の部分だけが見えるように枠で切り抜き、
 * 茶色の背景に合わせて白く反転している。
 */
export function CateringHeader() {
  return (
    <header className="flex justify-center pt-2">
      <Link
        href="/"
        aria-label={`${site.name} トップページへ`}
        className="relative block w-11 h-12 overflow-hidden rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-current"
      >
        <Image
          src="/nono_logo.png"
          alt={`${site.name} ロゴ`}
          width={203}
          height={271}
          className="absolute max-w-none invert brightness-110"
          style={{ left: -79.5, top: -111.5 }}
        />
      </Link>
    </header>
  );
}
