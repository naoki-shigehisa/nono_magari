"use client";
import Image from "next/image";
import { useState } from "react";
import { morningMenus, nightMenus, type MenuGroup, type PastMenu } from "./pastMenus";

export default function Home() {
  type Mode = "morning" | "night";
  const [mode, setMode] = useState<Mode>("morning");

  return (
    <div className={`font-sans transition-colors duration-300 ${
      mode === "night" ? "bg-[#555555] text-neutral-100" : "bg-background text-foreground"
    }`}>
      {/* Night global overlay removed: switch to dedicated night assets/colors */}
      {/* Hero */}
      <section className={`relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden ${
        mode === "night" ? "bg-[#5e5e5e]" : "bg-white"
      }`}>
        <Image
          src="/nono_logo.png"
          alt="Hero logo"
          fill
          className={`object-contain transition-[filter,opacity] duration-300 ${mode === "night" ? "invert brightness-110" : ""}`}
          priority
        />
        {/* Mode Switch on hero */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className={`flex items-center justify-center gap-6 sm:gap-8 p-0 ${
            mode === "night" ? "text-neutral-100" : "text-neutral-900"
          }`}>
            <button
              type="button"
              aria-pressed={mode === "morning"}
              onClick={() => setMode("morning")}
              className={`px-0 py-0 text-sm sm:text-base transition-opacity underline-offset-4 decoration-2 decoration-current ${
                mode === "morning" ? "underline opacity-100" : "no-underline opacity-70 hover:opacity-100"
              }`}
            >
              Morning
            </button>
            <button
              type="button"
              aria-pressed={mode === "night"}
              onClick={() => setMode("night")}
              className={`px-0 py-0 text-sm sm:text-base transition-opacity underline-offset-4 decoration-2 decoration-current ${
                mode === "night" ? "underline opacity-100" : "no-underline opacity-70 hover:opacity-100"
              }`}
            >
              Night
            </button>
          </div>
        </div>
      </section>

      {mode === "morning" ? (
        <>
          {/* Concept - Morning */}
          <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-2xl text-neutral-900">一日のはじまりに、余白とやすらぎを。</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                旬の食材、心地よい空間、素材の味を大切に。<br/>
                東京の真ん中で、やさしい朝ごはんをどうぞ。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
              <Image src="/nono_3.jpg" alt="nono_3" fill className="object-cover" />
            </div>
          </section>

          {/* Ingredient - Morning */}
          <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-2xl text-neutral-900">こだわりの素材を大切に。</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                手を加えすぎず、でも手を抜かない。<br/>
                旬を迎えた野菜、旨味ののった出汁、米の香り。<br/>
                必要以上に味を重ねず、素材が持つ輪郭をそのまま味わっていただく。<br/>
                そんな静かな料理を、一つひとつ丁寧に仕立てています。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
              <Image src="/nono_1.jpg" alt="nono_1" fill className="object-cover" />
            </div>
          </section>

          <PastMenus menus={morningMenus} tone="morning" />

          {/* Info / Access */}
          <section className="flex justify-center px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-[1024px] text-center">
              <h3 className="text-xl sm:text-2xl">朝ごはん 野々</h3>
              <ul className="mt-4 space-y-2 text-sm sm:text-base">
                <li>NEXT OPEN 2026年10月11日</li>
                <li>OPEN 8:00 / CLOSE 16:00 (L.O. 15:30)</li>
                <li>東京都中野区鷺宮3-7-1 MITATE</li>
              </ul>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Concept - Night */}
          <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-2xl text-neutral-100">手に入った今がいちばんのごちそう。</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300">
                その日に手に入ったものから、献立を考えます。<br/>
                市場で目に留まった魚、届いたばかりの野菜、蔵から届いた一本。<br/>
                決まった定番はありません。<br/>
                今日いちばん美味しいものを、今日の一杯と合わせてどうぞ。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white/10 shadow-md">
              <Image src="/nono_4.jpg" alt="店内の様子" fill className="object-cover" />
            </div>
          </section>

          <PastMenus menus={nightMenus} tone="night" />

          {/* Info / Access */}
          <section className="flex justify-center px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-[1024px] text-center">
              <h3 className="text-xl sm:text-2xl">野々 酒場</h3>
              <ul className="mt-4 space-y-2 text-sm sm:text-base">
                <li>NEXT Instagram にて告知予定</li>
                <li>OPEN 15:00 / CLOSE 23:00 (L.O. 22:30)</li>
                <li>東京都中野区鷺宮3-7-1 MITATE</li>
              </ul>
            </div>
          </section>
        </>
      )}

      {/* Instagram CTA */}
      <section className="px-6 sm:px-10 py-12">
        <div className="max-w-[1024px] mx-auto text-center">
          <div className="text-sm opacity-70">Follow us on Instagram</div>
          <a
            href="https://instagram.com/nono_magari"
            rel="noopener noreferrer"
            aria-label="Instagram @nono_magari"
            className={`inline-flex items-center justify-center mt-1 text-base sm:text-lg px-3 py-2 rounded underline underline-offset-4 sm:no-underline transition-colors focus:outline-none ${
              mode === "night"
                ? "text-neutral-100 hover:opacity-90 focus-visible:ring-1 focus-visible:ring-neutral-100/30 active:opacity-80"
                : "text-neutral-900 hover:opacity-80 focus-visible:ring-1 focus-visible:ring-neutral-900/20 active:opacity-90"
            }`}
          >
            <span>@nono_magari</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm">
        <p>Copyright © 2026 野々</p>
      </footer>
    </div>
  );
}

function MenuList({
  groups,
  tone,
  columns = false,
}: {
  groups: MenuGroup[];
  tone: "morning" | "night";
  /** グループが複数あるとき、広い画面では 2 カラムに並べる */
  columns?: boolean;
}) {
  const title = tone === "night" ? "text-neutral-400" : "text-neutral-500";
  const item = tone === "night" ? "text-neutral-200" : "text-neutral-700";
  return (
    <div className={columns ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3" : "space-y-3"}>
      {groups.map((group, i) => (
        <div key={group.title ?? i}>
          {group.title && (
            <div className={`text-[11px] tracking-widest ${title}`}>{group.title}</div>
          )}
          <ul className={`mt-0.5 list-none pl-0 text-[14px] sm:text-[15px] leading-6 space-y-1 ${item}`}>
            {group.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PastMenus({
  menus,
  tone,
}: {
  menus: PastMenu[];
  tone: "morning" | "night";
}) {
  // 最新の回を初期表示
  const [index, setIndex] = useState(menus.length - 1);
  const menu = menus[Math.min(index, menus.length - 1)];
  const night = tone === "night";

  const card = night
    ? "bg-white/5 border border-white/10 shadow-md"
    : "bg-white border border-black/5 shadow-sm";
  const divider = night ? "border-white/10" : "border-black/5";
  const labelText = night ? "text-neutral-400" : "text-neutral-400";
  const headingText = night ? "text-neutral-300" : "text-neutral-500";

  // タブは年が変わる最初の回だけ年付きで表示する（2025/8/30, 9/28, ..., 2026/4/11, 7/4）
  const tabLabels = menus.map((m, i) => {
    const year = m.date.slice(0, 4);
    const prevYear = i > 0 ? menus[i - 1].date.slice(0, 4) : null;
    return year === prevYear ? m.date.slice(5) : m.date;
  });

  return (
    <section className="px-6 sm:px-10 py-16 sm:py-24">
      <div className="max-w-[1024px] mx-auto">
        <h3 className="text-xl sm:text-2xl text-center tracking-tight">Past Menus</h3>

        {/* 日付タブ: ヒーローの Morning / Night 切替と同じ下線スタイル */}
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-7">
          {menus.map((m, i) => {
            const selected = i === index;
            return (
              <button
                key={m.date}
                type="button"
                aria-pressed={selected}
                onClick={() => setIndex(i)}
                className={`px-0 py-1 text-[13px] sm:text-sm font-mono tabular-nums tracking-widest transition-opacity underline-offset-4 decoration-2 decoration-current ${
                  selected ? "underline opacity-100" : "no-underline opacity-55 hover:opacity-100"
                }`}
              >
                {tabLabels[i]}
              </button>
            );
          })}
        </div>

        {/* 選択中の回 */}
        <article key={menu.date} className={`mt-6 rounded-xl overflow-hidden ${card}`}>
          <div className={`grid grid-cols-1 ${menu.image ? "md:grid-cols-[2fr_3fr]" : ""}`}>
            {menu.image && (
              <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-full">
                <Image src={menu.image.src} alt={menu.image.alt} fill className="object-cover" />
              </div>
            )}
            <div className="px-5 sm:px-6 py-5">
              {menu.label && (
                <div className={`mb-3 pb-3 border-b ${divider} text-[11px] uppercase tracking-[0.25em] ${labelText}`}>
                  {menu.label}
                </div>
              )}
              <div className={`grid grid-cols-1 gap-6 ${menu.sake ? "sm:grid-cols-2" : ""}`}>
                <div>
                  {menu.sake && (
                    <div className={`mb-2 text-[11px] uppercase tracking-[0.25em] ${headingText}`}>おしながき</div>
                  )}
                  <MenuList
                    groups={menu.food}
                    tone={tone}
                    columns={!menu.sake && !menu.image && menu.food.length > 1}
                  />
                </div>
                {menu.sake && (
                  <div>
                    <div className={`mb-2 text-[11px] uppercase tracking-[0.25em] ${headingText}`}>日本酒</div>
                    <MenuList groups={[{ items: menu.sake }]} tone={tone} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
