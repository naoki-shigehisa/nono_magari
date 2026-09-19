/** サイト全体で共有する情報（メタデータ、構造化データ、フッターなどで使用） */
export const site = {
  name: "野々",
  description:
    "不定期で間借り営業を行っている朝ごはん屋です。『一日のはじまりに、余白とやすらぎを』をコンセプトに、旬の食材をやさしく調理。今後は日本酒を中心とした夜の居酒屋営業も予定しています。",
  url: "https://www.nono-magari.com",
  instagram: {
    handle: "@nono_magari",
    url: "https://instagram.com/nono_magari",
  },
  address: {
    streetAddress: "宮前5-9-8 okatte にしおぎ",
    addressLocality: "杉並区",
    addressRegion: "東京都",
    postalCode: "168-0081",
    addressCountry: "JP",
  },
  copyrightYear: 2026,
} as const;
