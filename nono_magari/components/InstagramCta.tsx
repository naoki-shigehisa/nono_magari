import { site, type Mode } from "@/content";
import { CONTENT_WIDTH, SECTION_X, theme } from "@/lib/theme";

export function InstagramCta({ mode }: { mode: Mode }) {
  return (
    <section className={`${SECTION_X} py-12`}>
      <div className={`${CONTENT_WIDTH} mx-auto text-center`}>
        <div className="text-sm opacity-70">Follow us on Instagram</div>
        <a
          href={site.instagram.url}
          rel="noopener noreferrer"
          aria-label={`Instagram ${site.instagram.handle}`}
          className={`inline-flex items-center justify-center mt-1 text-base sm:text-lg px-3 py-2 rounded underline underline-offset-4 sm:no-underline transition-colors focus:outline-none ${theme[mode].link}`}
        >
          <span>{site.instagram.handle}</span>
        </a>
      </div>
    </section>
  );
}
