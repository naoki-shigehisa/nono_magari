import type { ShopInfo } from "@/content";
import { CONTENT_WIDTH, SECTION_X } from "@/lib/theme";

/** 店舗情報（次回営業日 / 営業時間 / 住所） */
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
      </div>
    </section>
  );
}
