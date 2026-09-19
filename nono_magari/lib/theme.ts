import type { Mode } from "@/content";

/**
 * Morning / Night で切り替わる色クラスをここに集約する。
 * コンポーネント側では `theme[mode].xxx` を参照し、モードの三項演算子を書かない。
 */
export const theme = {
  morning: {
    /** ページ全体の背景と文字色 */
    page: "bg-background text-foreground",
    hero: "bg-white",
    heroLogo: "",
    heroSwitch: "text-neutral-900",
    heading: "text-neutral-900",
    body: "text-neutral-700",
    /** 小見出しなど、本文より一段落とした色 */
    muted: "text-neutral-500",
    /** ラベルなど、さらに薄い色 */
    subtle: "text-neutral-400",
    card: "bg-white border border-black/5 shadow-sm",
    imageFrame: "bg-white shadow-sm",
    divider: "border-black/5",
    link: "text-neutral-900 hover:opacity-80 focus-visible:ring-1 focus-visible:ring-neutral-900/20 active:opacity-90",
  },
  night: {
    page: "bg-[#555555] text-neutral-100",
    hero: "bg-[#5e5e5e]",
    heroLogo: "invert brightness-110",
    heroSwitch: "text-neutral-100",
    heading: "text-neutral-100",
    body: "text-neutral-300",
    muted: "text-neutral-300",
    subtle: "text-neutral-400",
    card: "bg-white/5 border border-white/10 shadow-md",
    imageFrame: "bg-white/10 shadow-md",
    divider: "border-white/10",
    link: "text-neutral-100 hover:opacity-90 focus-visible:ring-1 focus-visible:ring-neutral-100/30 active:opacity-80",
  },
} as const satisfies Record<Mode, Record<string, string>>;

export type Theme = (typeof theme)[Mode];

/** 見出しなどの下に敷く、幅いっぱいのコンテンツ幅 */
export const CONTENT_WIDTH = "max-w-[1024px]";

/** 各セクション共通の左右余白 */
export const SECTION_X = "px-6 sm:px-10";
