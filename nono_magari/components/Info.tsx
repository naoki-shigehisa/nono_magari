import { site, type ShopInfo } from "@/content";
import { CONTENT_WIDTH, SECTION_X } from "@/lib/theme";

/** 店舗情報（次回営業日 / 営業時間 / 住所 / アクセス） */
export function Info({ info }: { info: ShopInfo }) {
  return (
    <section className={`flex justify-center ${SECTION_X} py-16 sm:py-24`}>
      <div className={`${CONTENT_WIDTH} text-center`}>
        <h3 className="text-xl sm:text-2xl">{info.name}</h3>
        <ul className="mt-4 space-y-2 text-sm sm:text-base">
          {info.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {/* 最寄り駅と地図。住所の下に一段小さく添える */}
        <address className="mt-4 not-italic text-xs sm:text-sm leading-relaxed opacity-70">
          {site.access.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="mt-2">
            <a
              href={site.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-current/40 hover:opacity-80"
            >
              Google Map
            </a>
          </p>
        </address>
      </div>
    </section>
  );
}
