import Link from "next/link";
import type { Mode } from "@/content";
import { CONTENT_WIDTH, SECTION_X, theme } from "@/lib/theme";

/** トップページから実績ページへの導線 */
export function WorksCta({ mode }: { mode: Mode }) {
  return (
    <section className={`${SECTION_X} pt-4 pb-4`}>
      <div className={`${CONTENT_WIDTH} mx-auto text-center`}>
        <div className="text-sm opacity-70">イベント出店・ケータリングの実績</div>
        <Link
          href="/works"
          className={`inline-flex items-center justify-center mt-1 text-base sm:text-lg px-3 py-2 rounded underline underline-offset-4 sm:no-underline transition-colors focus:outline-none ${theme[mode].link}`}
        >
          Works →
        </Link>
      </div>
    </section>
  );
}
