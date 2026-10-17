import Image from "next/image";
import Link from "next/link";
import { site, works, type Work } from "@/content";
import { CONTENT_WIDTH, SECTION_X, theme } from "@/lib/theme";
import { Footer } from "./Footer";
import { InstagramCta } from "./InstagramCta";

// 実績ページは朝（Morning）の配色で固定する
const t = theme.morning;

/** 実績ページ本体。中身は content/works.ts から引く */
export function Works() {
  return (
    <div className={`font-sans ${t.page}`}>
      {/* トップのヒーローを低くしたもの。ロゴからトップへ戻れる */}
      <header className={`relative w-full h-[32vh] sm:h-[40vh] ${t.hero}`}>
        <Link href="/" aria-label={`${site.name} トップへ`} className="absolute inset-0 hover:opacity-70 transition-opacity">
          <Image src="/nono_logo.png" alt={`${site.name} ロゴ`} fill priority className="object-contain" />
        </Link>
      </header>

      <section className={`${SECTION_X} py-16 sm:py-24`}>
        <div className={`${CONTENT_WIDTH} mx-auto`}>
          <h1 className={`text-2xl sm:text-3xl text-center tracking-tight font-medium ${t.heading}`}>Works</h1>
          <p className={`mt-3 text-center text-xs sm:text-sm leading-relaxed ${t.muted}`}>
            お店の外で、野々の味をお届けした記録です。
            <br />
            イベント出店やケータリングのご相談は Instagram の DM からどうぞ。
          </p>

          <div className="mt-10 space-y-10">
            {works.map((work) => (
              <WorkCard key={`${work.date}-${work.title}`} work={work} />
            ))}
          </div>

          <p className="mt-12 text-center text-sm">
            <Link
              href="/"
              className="underline underline-offset-4 decoration-current/40 hover:opacity-80"
            >
              ← トップへ戻る
            </Link>
          </p>
        </div>
      </section>

      <InstagramCta mode="morning" />
      <Footer />
    </div>
  );
}

function WorkCard({ work }: { work: Work }) {
  const [main, ...rest] = work.images;
  return (
    <article className={`rounded-xl overflow-hidden ${t.card}`}>
      <div className={`grid grid-cols-1 ${main ? "md:grid-cols-[2fr_3fr]" : ""}`}>
        {main && (
          <div className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-full">
            <Image src={main.src} alt={main.alt} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="px-5 sm:px-6 py-5">
          <div className={`mb-3 pb-3 border-b ${t.divider} flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-[0.25em] ${t.subtle}`}>
            <span className="font-mono tabular-nums tracking-widest">{work.date}</span>
            {work.label && <span>{work.label}</span>}
          </div>

          <h2 className={`text-xl sm:text-2xl ${t.heading}`}>{work.title}</h2>
          <div className={`mt-1 text-xs sm:text-sm ${t.muted}`}>{work.place}</div>

          <p className={`mt-4 text-sm sm:text-[15px] leading-relaxed ${t.body}`}>
            {work.description.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>

          {work.stats && (
            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              {work.stats.map((s) => (
                <div key={s.label}>
                  <dt className={`text-[11px] tracking-widest ${t.subtle}`}>{s.label}</dt>
                  <dd className={`mt-0.5 text-lg sm:text-xl ${t.heading}`}>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {work.menu && (
            <div className="mt-6">
              <div className={`mb-2 text-[11px] uppercase tracking-[0.25em] ${t.muted}`}>Menu</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {work.menu.map((group, i) => (
                  <div key={group.title ?? i}>
                    {group.title && (
                      <div className={`text-[11px] tracking-widest ${t.subtle}`}>{group.title}</div>
                    )}
                    <ul className={`mt-0.5 list-none pl-0 text-[14px] sm:text-[15px] leading-6 space-y-1 ${t.body}`}>
                      {group.items.map((item) => (
                        <li key={item.name} className="flex justify-between gap-3">
                          <span>{item.name}</span>
                          {item.price && <span className="shrink-0 tabular-nums">{item.price}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {work.link && (
            <p className="mt-6 text-xs sm:text-sm">
              <a
                href={work.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-current/40 hover:opacity-80"
              >
                {work.link.label}
              </a>
            </p>
          )}
        </div>
      </div>

      {rest.map((img) => (
        <div key={img.src} className={`border-t ${t.divider}`}>
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 1024px, 100vw" className="w-full h-auto" />
        </div>
      ))}
    </article>
  );
}
