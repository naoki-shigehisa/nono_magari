/** サイト全体で共有する情報（メタデータ、構造化データ、フッターなどで使用） */
export const site = {
  name: "野々",
  /** 検索結果のタイトルに付ける短い説明。「店名 | tagline」の形で使う */
  tagline: "鷺ノ宮・都立家政の間借り朝ごはん屋（和食モーニング）",
  /** 検索結果・OGP・構造化データに使う説明文（120 文字前後） */
  description:
    "野々は、西武新宿線 鷺ノ宮駅・都立家政駅の近く「MITATE」で不定期に間借り営業している和食の朝ごはん屋（モーニング）です。『一日のはじまりに、余白とやすらぎを』をコンセプトに、旬の食材でやさしい朝ごはん定食をお出しします。夜は日本酒を楽しむ「野々酒場」も。",
  /** meta keywords（検索順位への直接効果は薄いが、内容の要約として持っておく） */
  keywords: [
    "野々",
    "朝ごはん",
    "モーニング",
    "和食",
    "間借り",
    "朝ごはん定食",
    "都立家政",
    "鷺ノ宮",
    "鷺宮",
    "中野区",
    "阿佐ヶ谷",
    "西荻窪",
    "西武新宿線",
    "野々酒場",
    "日本酒",
  ],
  url: "https://www.nono-magari.com",
  instagram: {
    handle: "@nono_magari",
    url: "https://instagram.com/nono_magari",
  },
  /** 現在の営業場所（間借り先） */
  venue: {
    name: "MITATE",
    /** 表示用の 1 行住所 */
    label: "東京都中野区鷺宮3-7-1 MITATE",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("東京都中野区鷺宮3-7-1 MITATE"),
  },
  /** 構造化データ用の住所（schema.org PostalAddress） */
  address: {
    streetAddress: "鷺宮3-7-1 MITATE",
    addressLocality: "中野区",
    addressRegion: "東京都",
    postalCode: "165-0032",
    addressCountry: "JP",
  },
  /** 最寄り駅・アクセス（Info セクションで住所の下に表示） */
  access: [
    "西武新宿線 鷺ノ宮駅・都立家政駅 徒歩圏",
    "阿佐ヶ谷・西荻窪など中央線沿線からも、バスや自転車でどうぞ",
  ],
  /** OGP などで使う代表写真 */
  ogImage: { src: "/nono_1.jpg", width: 1440, height: 1920, alt: "野々の朝ごはん定食" },
  copyrightYear: 2026,
} as const;
