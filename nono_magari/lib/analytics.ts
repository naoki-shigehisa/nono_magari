/**
 * 計測（Meta ピクセル / GA4）をまとめたモジュール。イベントの送信は /catering 以下で使う。
 *
 * ページ側からは `track("contact_start", { method, position })` / `track("lead")` を呼ぶだけ。
 * タグ本体の読み込みは、GA4 が components/GoogleAnalytics.tsx（サイト全体）、
 * Meta ピクセルが components/catering/MetaPixel.tsx（/catering 以下だけ）。
 *
 * ID は環境変数で渡す（ビルド時に埋め込まれる）:
 *   NEXT_PUBLIC_META_PIXEL_ID       例: 123456789012345
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID   例: G-XXXXXXXXXX
 * 未設定（または形式が違う）ときはタグを読み込まず、送信は何もしない。
 * 開発時（next dev）は、送るはずだったイベントをコンソールに出す。
 */

const rawPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const rawGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** インラインスクリプトに埋め込むので、想定の形式でなければ未設定として扱う */
export const META_PIXEL_ID = /^\d{5,20}$/.test(rawPixelId) ? rawPixelId : "";
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]{4,20}$/.test(rawGaId) ? rawGaId : "";

const DEBUG = process.env.NODE_ENV !== "production";

export type ContactMethod = "form" | "instagram_dm" | "form_direct";
export type CtaPosition = "hero" | "bottom" | "sticky" | "apply";

type EventMap = {
  /** 申込み・相談を始めた（Meta: Contact / GA4: catering_contact_start） */
  contact_start: { method: ContactMethod; position?: CtaPosition };
  /** フォームを送信した（Meta: Lead / GA4: generate_lead） */
  lead: undefined;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const KEY = {
  utm: "catering:utm",
  contactSent: (method: ContactMethod) => `catering:contact:${method}`,
  submitted: "catering:submitted",
  formPosition: "catering:form_position",
} as const;

/* ---------- sessionStorage（使えない環境があるので、失敗しても止めない） ---------- */

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): boolean {
  try {
    window.sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeSession(key: string) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* 何もしない */
  }
}

/** sessionStorage が使えないときの代わり（ページを読み込み直すまでの間だけ有効） */
const memory = new Set<string>();

/* ---------- UTM ---------- */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** URL に utm_* が付いていれば、セッションの間おぼえておく。付いていなければ前の値を残す */
export function captureUtm() {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return;
  }
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  if (Object.keys(utm).length > 0) writeSession(KEY.utm, JSON.stringify(utm));
}

export function getUtm(): Utm {
  const raw = readSession(KEY.utm);
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const utm: Utm = {};
    for (const key of UTM_KEYS) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string") utm[key] = value;
    }
    return utm;
  } catch {
    return {};
  }
}

/** 広告から来たセッションか（utm_medium=paid） */
export function isPaidSession(): boolean {
  return getUtm().utm_medium === "paid";
}

/* ---------- フォーム送信済みの印 / フォームボタンを押した場所 ---------- */

export function markSubmitted() {
  writeSession(KEY.submitted, "1");
}

/** 印があれば消して true を返す。再読み込みや直接開いたときは false */
export function consumeSubmitted(): boolean {
  if (readSession(KEY.submitted) !== "1") return false;
  removeSession(KEY.submitted);
  return true;
}

/** LP の「フォームで申し込む」を押した場所。/catering/apply を開いたときの Contact に付ける */
export function rememberFormPosition(position: CtaPosition) {
  writeSession(KEY.formPosition, position);
}

export function recallFormPosition(): CtaPosition | undefined {
  const value = readSession(KEY.formPosition);
  return value === "hero" || value === "bottom" || value === "sticky" || value === "apply"
    ? value
    : undefined;
}

/* ---------- 送信 ---------- */

/** あとでコンバージョン API を足したときに、ブラウザ側のイベントと重複を除くための ID */
function newEventId(): string {
  try {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    /* 下の方法で作る */
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function sendMeta(name: string, params: Record<string, unknown>, eventID: string) {
  if (DEBUG) console.info("[analytics] meta", name, params, { eventID }, META_PIXEL_ID ? "" : "(ID 未設定: 送信なし)");
  if (!META_PIXEL_ID || typeof window.fbq !== "function") return;
  try {
    window.fbq("track", name, params, { eventID });
  } catch {
    /* 計測の失敗で画面を止めない */
  }
}

function sendGa(name: string, params: Record<string, unknown>, eventID: string) {
  const payload = { ...params, ...getUtm(), event_id: eventID };
  if (DEBUG) console.info("[analytics] ga4", name, payload, GA_MEASUREMENT_ID ? "" : "(ID 未設定: 送信なし)");
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, payload);
  } catch {
    /* 計測の失敗で画面を止めない */
  }
}

/**
 * イベントを送る。実際に送った（または開発時に送るはずだった）とき true を返す。
 * contact_start は、1 セッションで method ごとに 1 回だけ送る。
 */
export function track<K extends keyof EventMap>(
  ...args: EventMap[K] extends undefined ? [name: K] : [name: K, params: EventMap[K]]
): boolean {
  if (typeof window === "undefined") return false;
  const [name, params] = args;

  if (name === "contact_start" && params) {
    const key = KEY.contactSent(params.method);
    if (memory.has(key) || readSession(key) === "1") return false;
    memory.add(key);
    writeSession(key, "1");

    const eventID = newEventId();
    const data: Record<string, unknown> = { method: params.method };
    if (params.position) data.position = params.position;
    sendMeta("Contact", data, eventID);
    sendGa("catering_contact_start", data, eventID);
    return true;
  }

  if (name === "lead") {
    const eventID = newEventId();
    sendMeta("Lead", {}, eventID);
    sendGa("generate_lead", { method: "form" }, eventID);
    return true;
  }

  return false;
}

let pageViewLogged = false;

/**
 * ページ表示は、タグ本体が読み込み時に自動で送る（Meta: PageView / GA4: page_view）。
 * ここでは開発時にコンソールへ出すだけ。
 */
export function debugPageView() {
  if (!DEBUG || pageViewLogged) return;
  pageViewLogged = true;
  console.info(
    "[analytics] meta PageView / ga4 page_view",
    window.location.pathname,
    META_PIXEL_ID || GA_MEASUREMENT_ID ? "(タグが自動で送信)" : "(ID 未設定: 送信なし)",
  );
}
