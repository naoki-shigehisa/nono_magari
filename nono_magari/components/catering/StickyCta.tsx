"use client";
import { useEffect, useState } from "react";
import { catering } from "@/content/catering";
import { DmCta, FormCta } from "./Cta";

type Props = {
  /** この id の要素（ファーストビューのボタン）が画面外にある間だけ表示する */
  watchId: string;
};

/** スマホで画面下に固定するボタン。PC 幅では出さない */
export function StickyCta({ watchId }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target || typeof IntersectionObserver === "undefined") return;
    // ボタンが少しでも欠けたら出す（小さい画面でも、フォームと DM のボタンが必ず見えるように）
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio < 1), {
      threshold: 1,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      inert={!visible}
      className={`sm:hidden fixed inset-x-0 bottom-0 z-20 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#6f4626]/95 text-[#fbf7ea] shadow-[0_-1px_0_rgba(255,255,255,0.12)] transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <FormCta position="sticky" />
        <DmCta position="sticky">{catering.cta.dmShort}</DmCta>
      </div>
    </div>
  );
}
