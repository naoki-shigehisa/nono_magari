# nono_magari

朝ごはん屋「野々」と「野々酒場」のサイト。[Next.js](https://nextjs.org)（App Router）+ Tailwind CSS で構成された 1 ページ構成の静的サイトです。

## 開発

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

リポジトリ直下の `docker-compose.yml` で Docker 上でも起動できます（`docker compose up`）。

## ディレクトリ構成

```
app/           ルーティングとグローバル設定（Next.js の規約に従う場所）
  layout.tsx     フォント、メタデータ、構造化データ
  page.tsx       トップページの入口。<Home /> を描画するだけ
  sitemap.ts     /sitemap.xml（検索エンジン向け）
  robots.ts      /robots.txt（検索エンジン向け）
  globals.css    Tailwind の読み込みとテーマ変数

components/    画面を構成するコンポーネント（セクション単位）
  Home.tsx       Morning / Night の状態を持ち、各セクションを並べる
  Hero.tsx       ロゴと Morning / Night 切替
  Concept.tsx    見出し + 本文 + 写真の 2 カラムセクション
  PastMenus.tsx  過去メニュー（日付タブで 1 回分ずつ表示）
  MenuList.tsx   小見出し付きの品目リスト
  Info.tsx       店舗情報（次回営業日 / 営業時間 / 住所）
  InstagramCta.tsx
  Footer.tsx

content/       文言・データ。日々の更新はここだけで済むようにしている
  site.ts        店名、説明文、キーワード、Instagram、住所、アクセスなどサイト全体の情報
  morning.ts     朝ごはん: コンセプト文、店舗情報、過去メニュー
  night.ts       酒場: 同上
  types.ts       上記の型定義
  index.ts       まとめて export

lib/
  theme.ts       Morning / Night で切り替わる色クラスの一覧
```

### 方針

- **見た目（components）と中身（content）を分ける。** 営業日やメニューの更新でコンポーネントを触らないようにする。
- **モードによる色の分岐は `lib/theme.ts` に集める。** コンポーネント内で `mode === "night" ? ... : ...` を書かず、`theme[mode].xxx` を参照する。
- **セクションは 1 ファイル 1 コンポーネント。** 新しいセクションを足すときは `components/` に追加し、`Home.tsx` で並べる。

## よくある更新

### 次回の営業日や営業時間を変える

`content/morning.ts` または `content/night.ts` の `info.lines` を編集します。

### 過去メニューを追加する

`content/morning.ts` または `content/night.ts` の `pastMenus` 配列の末尾に 1 件追加します。日付順（古い順）に並べてください。タブは自動で生成され、最新の回が初期表示になります。

```ts
{
  date: "2026/10/11",
  label: "PRE-OPENING",             // 任意
  image: { src: "/xxx.jpg", alt: "..." }, // 任意（public/ に置く）
  food: [
    { title: "冷菜", items: ["..."] },  // title は省略可
  ],
  sake: ["..."],                     // 酒場のみ
}
```

### コンセプト文を変える

`content/morning.ts` または `content/night.ts` の `concepts` を編集します。`lines` の 1 要素が 1 行になります。

### 色を変える

`lib/theme.ts` を編集します。ページ全体の背景色は `app/globals.css` の CSS 変数（Morning）と `theme.night.page`（Night）にあります。
