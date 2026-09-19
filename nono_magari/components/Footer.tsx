import { site } from "@/content";
import { SECTION_X } from "@/lib/theme";

export function Footer() {
  return (
    <footer
      className={`${SECTION_X} py-10 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm`}
    >
      <p>
        Copyright © {site.copyrightYear} {site.name}
      </p>
    </footer>
  );
}
