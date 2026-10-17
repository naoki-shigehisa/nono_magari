import Link from "next/link";
import { site } from "@/content";
import { SECTION_X } from "@/lib/theme";

type Props = {
  /** 実績ページへのリンクを出すか（実績ページ自身では出さない） */
  showWorksLink?: boolean;
};

export function Footer({ showWorksLink = true }: Props) {
  return (
    <footer
      className={`${SECTION_X} py-10 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm`}
    >
      {showWorksLink && (
        <nav aria-label="フッター" className="mb-4">
          <Link
            href="/works"
            className="tracking-widest opacity-70 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
          >
            Works
          </Link>
        </nav>
      )}
      <p>
        Copyright © {site.copyrightYear} {site.name}
      </p>
    </footer>
  );
}
