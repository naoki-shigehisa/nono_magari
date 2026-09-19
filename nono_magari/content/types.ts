/** 画面のモード。ヒーローの Morning / Night 切替で切り替わる */
export type Mode = "morning" | "night";

export type MenuGroup = {
  /** 冷菜 / 温菜 / 〇〇定食 など。省略時は見出しなし */
  title?: string;
  items: string[];
};

export type PastMenu = {
  /** 日付（例: 2026/1/30）。タブの表示に使う */
  date: string;
  /** PRE-OPENING などの補足ラベル */
  label?: string;
  /** 写真（あれば） */
  image?: { src: string; alt: string };
  /** 料理 */
  food: MenuGroup[];
  /** 日本酒（酒場のみ） */
  sake?: string[];
};

/** 見出し + 本文 + 写真 の 2 カラムセクション */
export type ConceptSection = {
  title: string;
  /** 1 要素 = 1 行（改行で区切って表示） */
  lines: string[];
  image: { src: string; alt: string };
};

/** 店舗情報（NEXT OPEN / 営業時間 / 住所 など） */
export type ShopInfo = {
  name: string;
  /** 店名の下に添える短い紹介文。1 要素 = 1 行。省略可 */
  description?: string[];
  /** 1 要素 = 1 行 */
  lines: string[];
};

/** モードごとに表示する内容一式 */
export type ModeContent = {
  concepts: ConceptSection[];
  pastMenus: PastMenu[];
  info: ShopInfo;
};
