"use client";
import Image from "next/image";
import { useState } from "react";
import type { Mode, PastMenu } from "@/content";
import { CONTENT_WIDTH, SECTION_X, theme } from "@/lib/theme";
import { MenuList } from "./MenuList";

type Props = {
  menus: PastMenu[];
  mode: Mode;
};

/**
 * タブは年が変わる最初の回だけ年付きで表示する
 * （2025/8/30, 9/28, ..., 2026/4/11, 7/4）
 */
function tabLabels(menus: PastMenu[]): string[] {
  return menus.map((m, i) => {
    const year = m.date.slice(0, 4);
    const prevYear = i > 0 ? menus[i - 1].date.slice(0, 4) : null;
    return year === prevYear ? m.date.slice(5) : m.date;
  });
}

/** 過去メニュー: 日付タブで 1 回分ずつ表示する */
export function PastMenus({ menus, mode }: Props) {
  // 最新の回を初期表示
  const [index, setIndex] = useState(menus.length - 1);
  const menu = menus[Math.min(index, menus.length - 1)];
  const t = theme[mode];
  const labels = tabLabels(menus);

  if (!menu) return null;

  return (
    <section className={`${SECTION_X} py-16 sm:py-24`}>
      <div className={`${CONTENT_WIDTH} mx-auto`}>
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
                {labels[i]}
              </button>
            );
          })}
        </div>

        {/* 選択中の回 */}
        <article key={menu.date} className={`mt-6 rounded-xl overflow-hidden ${t.card}`}>
          <div className={`grid grid-cols-1 ${menu.image ? "md:grid-cols-[2fr_3fr]" : ""}`}>
            {menu.image && (
              <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-full">
                <Image src={menu.image.src} alt={menu.image.alt} fill className="object-cover" />
              </div>
            )}
            <div className="px-5 sm:px-6 py-5">
              {menu.label && (
                <div className={`mb-3 pb-3 border-b ${t.divider} text-[11px] uppercase tracking-[0.25em] ${t.subtle}`}>
                  {menu.label}
                </div>
              )}
              <div className={`grid grid-cols-1 gap-6 ${menu.sake ? "sm:grid-cols-2" : ""}`}>
                <div>
                  {menu.sake && <SectionHeading mode={mode}>おしながき</SectionHeading>}
                  <MenuList
                    groups={menu.food}
                    mode={mode}
                    columns={!menu.sake && !menu.image && menu.food.length > 1}
                  />
                </div>
                {menu.sake && (
                  <div>
                    <SectionHeading mode={mode}>日本酒</SectionHeading>
                    <MenuList groups={[{ items: menu.sake }]} mode={mode} />
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

function SectionHeading({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  return (
    <div className={`mb-2 text-[11px] uppercase tracking-[0.25em] ${theme[mode].muted}`}>{children}</div>
  );
}
