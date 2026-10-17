/** サイト全体で共有する情報（メタデータ、構造化データ、フッターなどで使用） */
export const site = {
  name: "野々",
  /** 検索結果のタイトルに付ける短い説明。「店名 | tagline」の形で使う */
  tagline: "鷺ノ宮・都立家政・西荻窪の間借り朝ごはん屋（和食モーニング）",
  /** 検索結果・OGP・構造化データに使う説明文（120 文字前後） */
  description:
    "野々は、西武新宿線 鷺ノ宮駅・都立家政駅の近く「MITATE」と、JR中央線 西荻窪駅の近く「間（あわい）」で不定期に間借り営業している和食の朝ごはん屋（モーニング）です。『一日のはじまりに、余白とやすらぎを』をコンセプトに、旬の食材でやさしい朝ごはん定食をお出しします。夜は日本酒を楽しむ「野々酒場」も。",
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
    "西武新宿線",
    "阿佐ヶ谷",
    "西荻窪",
    "西荻",
    "西荻南",
    "杉並区",
    "吉祥寺",
    "荻窪",
    "中央線",
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
    name: "間（あわい）",
    /** 表示用の 1 行住所 */
    label: "東京都杉並区西荻南3-9-8 間（あわい）",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("東京都杉並区西荻南3-9-8"),
  },
  /** 構造化データ用の住所（schema.org PostalAddress） */
  address: {
    streetAddress: "西荻南3-9-8 間（あわい）",
    addressLocality: "杉並区",
    addressRegion: "東京都",
    postalCode: "167-0053",
    addressCountry: "JP",
  },
  /** 最寄り駅・アクセス（Info セクションで住所の下に表示） */
  access: [
    "JR中央線・総武線 西荻窪駅 徒歩圏",
    "吉祥寺・荻窪からも、電車や自転車でどうぞ",
  ],
  /** OGP などで使う代表写真 */
  ogImage: { src: "/nono_1.jpg", width: 1440, height: 1920, alt: "野々の朝ごはん定食" },
  copyrightYear: 2026,
} as const;
