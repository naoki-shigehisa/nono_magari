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
  works/page.tsx 実績ページ（/works）の入口。<Works /> を描画するだけ
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
  Works.tsx      実績ページ本体（Morning の配色で固定）
  InstagramCta.tsx
  Footer.tsx     コピーライトと実績ページへのリンク

content/       文言・データ。日々の更新はここだけで済むようにしている
  site.ts        店名、説明文、キーワード、Instagram、住所、アクセスなどサイト全体の情報
  morning.ts     朝ごはん: コンセプト文、店舗情報、過去メニュー
  night.ts       酒場: 同上
  works.ts       出店・イベントなどの実績
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

### 実績を追加する

`content/works.ts` の `works` 配列の先頭に 1 件追加します（新しい順）。写真は `public/works/` に置き、`images` の 1 枚目が左側に大きく、2 枚目以降がカード下部に全幅で表示されます。

### コンセプト文を変える

`content/morning.ts` または `content/night.ts` の `concepts` を編集します。`lines` の 1 要素が 1 行になります。

### 色を変える

`lib/theme.ts` を編集します。ページ全体の背景色は `app/globals.css` の CSS 変数（Morning）と `theme.night.page`（Night）にあります。

## 弁当ケータリングの LP（/catering）

Instagram 広告の誘導先。トップや `/works` とは別の見た目（明朝体・茶色）で、見た目と Meta ピクセルは `app/catering/layout.tsx` 以下に閉じている。

| パス | 役割 |
|---|---|
| `/catering` | LP 本体 |
| `/catering/apply` | 簡易フォーム（空き日・お見積もりの確認）を埋め込んだページ。ご注文フォームへはテキストリンクで案内 |
| `/catering/thanks` | 送信完了ページ（ここで送信完了を計測する） |

- 文言・価格・条件・フォームの URL は `content/catering.ts`。ファーストビューの文言は広告のクリエイティブ（`../docs/catering/cr_1_2.webp`）と一字一句同じにしている。
- 弁当の写真は `public/catering/bento.jpg`。差し替えたら `content/catering.ts` の `heroImage` の縦横も直す。
- 計測は `lib/analytics.ts` にまとめている。GA4 はサイト全体（`app/layout.tsx` → `components/GoogleAnalytics.tsx`）、Meta ピクセルは `/catering` 以下だけ（`components/catering/MetaPixel.tsx`）。ID は環境変数で渡し、未設定ならタグを読み込まない。`next dev` では、送るはずだったイベントがコンソールに `[analytics]` 付きで出る。

  ```
  NEXT_PUBLIC_META_PIXEL_ID=（数字のみ）
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```

  ビルド時に埋め込まれるので、設定を変えたら再デプロイが要る。

- `/instagram`（Instagram へ転送する短縮 URL）は HTML を返さないので、ブラウザのタグでは数えられない。`app/instagram/route.ts` がサーバー側から GA4 に `instagram_redirect` イベントを送っている（`lib/analytics-server.ts`、Measurement Protocol）。bot とブラウザの先読みは数えない。`?utm_source=flyer` のように付けた UTM はイベントのパラメータとして送られる。

  ```
  GA_API_SECRET=（GA4 管理画面 → データストリーム → Measurement Protocol API secret で発行）
  ```

  未設定なら送らない（転送はする）。`next dev` では GA4 の検証用エンドポイントに送り、結果をコンソールに出す。

- 送信の検知は、フォームの iframe の `load` 2 回目を「送信した」とみなす方法（`components/catering/ApplyForm.tsx`）。**Google フォームが 1 ページ構成であることが前提**で、フォームにセクション（改ページ）を足すと誤検知する。
- ボタンのクリックは `catering_contact_start`（GA4）/ `Contact`（Meta）で数える。`method` は `form`（簡易フォーム。`/catering/apply` を開いたときに送る）/ `instagram_dm` / `form_direct` / `order_form`（ご注文フォーム）、`position` は `hero` / `bottom` / `sticky` / `apply` / `order`。1 セッションで `method` ごとに 1 回だけ送る。
