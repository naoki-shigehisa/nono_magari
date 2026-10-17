import type { Work } from "./types";

// 出店・イベントなどの実績。新しいものを先頭に追加する
export const works: Work[] = [
  {
    date: "2026/9/23",
    label: "EVENT",
    title: "超PMAM 飲食出展",
    place: "幕張メッセ",
    description: [
      "幕張メッセで開催された音楽フェス「超PMAM」に、飲食ブースとして出展しました。",
      "具沢山の豚汁やとろろ丼など、野々らしいやさしい味をフェス仕様のカップでお出ししました。",
    ],
    link: { label: "超PMAM 公式サイト", url: "https://shadows-japan.com/cho-pmam/" },
    stats: [
      { label: "フード", value: "約400食" },
      { label: "ドリンク", value: "約400杯" },
    ],
    menu: [
      {
        title: "フード",
        items: [
          { name: "具沢山！豚汁", price: "800円" },
          { name: "豚汁・白米セット", price: "1,100円" },
          { name: "とろろ丼", price: "700円" },
          { name: "和風ガパオライス", price: "700円" },
        ],
      },
      {
        title: "ドリンク",
        items: [
          { name: "ビール・晴れ風", price: "800円" },
          { name: "レモンサワー・本搾り", price: "700円" },
          { name: "日本酒 60ml（三井の寿 +14 純米吟醸 山田錦 大辛口）", price: "700円" },
          { name: "ポカリスエット 500ml", price: "400円" },
          { name: "水 550ml", price: "300円" },
        ],
      },
    ],
    images: [
      {
        src: "/works/cho-pmam_booth.jpg",
        alt: "超PMAM の野々ブース。「野々」の幕の下にメニューと注文口が並ぶ",
        width: 1108,
        height: 1477,
      },
      {
        src: "/works/cho-pmam_menu.jpg",
        alt: "超PMAM で提供したフードとドリンクのメニュー",
        width: 1822,
        height: 1020,
      },
    ],
  },
];
