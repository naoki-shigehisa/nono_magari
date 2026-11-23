import { Fragment } from "react";
import Image from "next/image";
import { site } from "@/content";
import { catering } from "@/content/catering";
import { Footer } from "@/components/Footer";
import { CateringHeader } from "./CateringHeader";
import { CtaPair } from "./Cta";
import { StickyCta } from "./StickyCta";

/** 1 カラムの幅。スマホ基準で、PC では中央に寄せる */
const COLUMN = "mx-auto w-full max-w-[520px] px-6";
/** 見出し。サイト共通の h2 / h3 の指定（ゴシック）を、このページの明朝体で上書きする */
const HEADING = "[font-family:inherit] font-normal text-center text-xl tracking-[0.3em]";
const HERO_CTA_ID = "catering-hero-cta";

function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

/** ファーストビュー。広告のクリエイティブ（CR）と同じ順番・同じ文言 */
function Hero() {
  const { hero, heroImage } = catering;
  return (
    <section className="bg-gradient-to-b from-[#8a5c3c] via-[#84573a] to-[#7a4f33] pb-10">
      <CateringHeader />
      <div className={`${COLUMN} text-center`}>
        <h1 className="mt-2 text-[1.625rem] min-[400px]:text-[1.75rem] font-bold leading-[1.45] tracking-[0.2em] [text-indent:0.2em]">
          <Lines lines={hero.heading} />
        </h1>
        <p className="mt-2 text-[0.8125rem] leading-[1.8] tracking-[0.16em] [text-indent:0.16em]">
          <Lines lines={hero.lead} />
        </p>

        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          sizes="(min-width: 520px) 472px, calc(100vw - 48px)"
          preload
          className="mt-4 w-full h-auto rounded-md shadow-[0_10px_30px_rgba(40,20,5,0.35)]"
        />

        <p className="mt-4 text-sm tracking-[0.2em] [text-indent:0.2em]">{hero.price.until}</p>
        <p className="flex items-baseline justify-center gap-3 whitespace-nowrap">
          <span className="text-base tracking-[0.12em]">
            {hero.price.regularLabel}
            {hero.price.regular}
            {hero.price.unit}
          </span>
          <span aria-hidden="true">→</span>
          <span>
            <strong className="text-[2.5rem] leading-none font-bold tracking-[0.08em]">
              {hero.price.campaign}
            </strong>
            <span className="text-lg">{hero.price.unit}</span>
          </span>
        </p>

        <ul className="mt-3 grid grid-cols-[1fr_0.8fr_1.15fr] divide-x divide-[#fbf7ea]/60">
          {hero.facts.map((fact, i) => (
            <li key={i} className="flex flex-col justify-center gap-0.5 px-1">
              {fact.lines.map((line) => (
                <span
                  key={line.text}
                  className={
                    "large" in line && line.large
                      ? "text-[1.0625rem] font-bold tracking-[0.12em] whitespace-nowrap"
                      : "text-[0.6875rem] tracking-[0.08em] whitespace-nowrap"
                  }
                >
                  {line.text}
                </span>
              ))}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <CtaPair position="hero" id={HERO_CTA_ID} />
        </div>
      </div>
    </section>
  );
}

function About() {
  const { about } = catering;
  return (
    <section className={`${COLUMN} py-16`}>
      <h2 className={HEADING}>{about.title}</h2>
      <p className="mt-8 text-[0.9375rem] leading-[2.1] tracking-[0.08em] text-center">
        <Lines lines={about.lines} />
      </p>
      <p className="mt-6 text-[0.8125rem] leading-[2] tracking-[0.04em] opacity-80">{about.example}</p>

      <h3 className={`${HEADING} mt-12 text-base`}>{about.rice.title}</h3>
      <ul className="mt-5 text-[0.9375rem] leading-[2.1] tracking-[0.08em] text-center">
        <li>{about.rice.base}</li>
        {about.rice.options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs tracking-[0.08em] text-center opacity-80">
        {about.rice.optionsNote}
      </p>
    </section>
  );
}

function Order() {
  const { order } = catering;
  const policy = order.cancelPolicy;
  return (
    <section className={`${COLUMN} py-16 border-t border-[#3d2a1a]/10`}>
      <h2 className={HEADING}>{order.title}</h2>
      <dl className="mt-8 text-[0.9375rem] leading-[1.9] tracking-[0.06em]">
        {order.rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[6.5em_1fr] gap-3 py-4 border-b border-[#3d2a1a]/10">
            <dt className="opacity-70">{row.label}</dt>
            <dd>
              <Lines lines={row.lines} />
            </dd>
          </div>
        ))}
      </dl>

      <h3 className={`${HEADING} mt-12 text-base`}>{order.notes.title}</h3>
      <ul className="mt-5 space-y-2 text-[0.8125rem] leading-[1.9] tracking-[0.04em]">
        {order.notes.items.map((item) => (
          <li key={item} className="grid grid-cols-[1em_1fr]">
            <span aria-hidden="true">・</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <details className="mt-8 border-y border-[#3d2a1a]/10">
        <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 py-3 text-[0.9375rem] tracking-[0.08em]">
          {policy.title}
          <span aria-hidden="true" className="text-xs opacity-60">
            ▼
          </span>
        </summary>
        <div className="pb-6 text-[0.8125rem] leading-[1.9] tracking-[0.04em]">
          {policy.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {policy.sections.map((section) => (
            <Fragment key={section.title}>
              <h4 className="mt-5 font-bold">{section.title}</h4>
              {section.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </Fragment>
          ))}
          {policy.outro.map((line) => (
            <p key={line} className="mt-5">
              {line}
            </p>
          ))}
        </div>
      </details>
    </section>
  );
}

function Flow() {
  const { flow } = catering;
  return (
    <section className={`${COLUMN} py-16 border-t border-[#3d2a1a]/10`}>
      <h2 className={HEADING}>{flow.title}</h2>
      <ol className="mt-8 space-y-6">
        {flow.steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[2.5rem_1fr] items-baseline">
            <span aria-hidden="true" className="text-xl text-[#5f7a3a]">
              {i + 1}
            </span>
            <div>
              <p className="text-[0.9375rem] tracking-[0.08em]">{step.title}</p>
              {step.lines.length > 0 && (
                <p className="mt-1 text-[0.8125rem] leading-[1.9] tracking-[0.04em] opacity-80">
                  <Lines lines={step.lines} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Nono() {
  const { nono } = catering;
  return (
    <section className={`${COLUMN} py-16 border-t border-[#3d2a1a]/10 text-center`}>
      <h2 className={HEADING}>{nono.title}</h2>
      <Image
        src={nono.image.src}
        alt={nono.image.alt}
        width={nono.image.width}
        height={nono.image.height}
        sizes="(min-width: 520px) 472px, calc(100vw - 48px)"
        loading="lazy"
        className="mt-8 w-full aspect-[4/3] object-cover rounded-md"
      />
      <p className="mt-8 text-[0.9375rem] leading-[2.1] tracking-[0.08em]">
        <Lines lines={nono.lines} />
      </p>
      <p className="mt-4">
        <a
          href={site.instagram.url}
          rel="noopener noreferrer"
          aria-label={`Instagram ${site.instagram.handle}`}
          className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] tracking-[0.08em] underline underline-offset-4 decoration-current/40 hover:opacity-80"
        >
          Instagram {site.instagram.handle}
        </a>
      </p>
    </section>
  );
}

/** 弁当ケータリングの LP 本体（/catering） */
export function CateringLp() {
  const { hero } = catering;
  return (
    <>
      <main>
        <Hero />

        <div className="bg-[#f6f1e6] text-[#3d2a1a]">
          <About />
          <Order />
          <Flow />
          <Nono />
        </div>

        <section className="bg-gradient-to-b from-[#84573a] to-[#7a4f33] py-14">
          <div className={`${COLUMN} text-center`}>
            <p className="text-xl font-bold leading-[1.7] tracking-[0.2em] [text-indent:0.2em]">
              <Lines lines={hero.heading} />
            </p>
            <div className="mt-8">
              <CtaPair position="bottom" />
            </div>
          </div>
        </section>
      </main>

      {/* 固定ボタンに隠れないよう、スマホでは下に余白を足す */}
      <div className="bg-[#f6f1e6] text-[#3d2a1a] pb-20 sm:pb-0">
        <Footer showWorksLink={false} />
      </div>

      <StickyCta watchId={HERO_CTA_ID} />
    </>
  );
}
