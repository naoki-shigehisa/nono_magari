/**
 * サーバー側から GA4 にイベントを送る（Measurement Protocol）。
 *
 * /instagram のように HTML を返さずに転送するだけの URL は、ブラウザでタグが動かないので
 * lib/analytics.ts の方法では計測できない。そういう URL だけ、ここからサーバー側で送る。
 *
 * 環境変数（サーバー側だけで読む。NEXT_PUBLIC_ は付けない）:
 *   GA_API_SECRET   GA4 管理画面 → データストリーム → Measurement Protocol API secret で発行
 * 測定 ID（NEXT_PUBLIC_GA_MEASUREMENT_ID）か GA_API_SECRET が未設定のときは何も送らない。
 * 開発時（next dev）は GA4 の検証用エンドポイントに送り、結果をコンソールに出す（GA には記録されない）。
 */
import type { NextRequest } from "next/server";
import { GA_MEASUREMENT_ID } from "./analytics";

const API_SECRET = process.env.GA_API_SECRET ?? "";
const DEBUG = process.env.NODE_ENV !== "production";
const TIMEOUT_MS = 3000;

/** リンクのプレビュー取得や検索エンジンなど、人の訪問ではないアクセス */
const BOT_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|meta-externalagent|whatsapp|line-poker|bitlybot|embedly|headless|lighthouse|monitor|curl|wget|python-requests|go-http-client|axios|node-fetch/i;

/** 人のアクセスとして数えてよいか。ブラウザの先読みと bot は数えない */
export function isCountableVisit(request: NextRequest): boolean {
  if (request.method !== "GET") return false;
  const purpose = request.headers.get("sec-purpose") ?? request.headers.get("purpose") ?? "";
  if (/prefetch|prerender/i.test(purpose)) return false;
  const ua = request.headers.get("user-agent") ?? "";
  return ua !== "" && !BOT_UA.test(ua);
}

/** `_ga` クッキー（GA1.1.1234567890.1700000000）から client_id を取り出す。サイトに来たことがある人はこれで同じユーザーになる */
function clientIdFromCookie(request: NextRequest): string | null {
  const m = /^GA\d\.\d+\.(\d+\.\d+)$/.exec(request.cookies.get("_ga")?.value ?? "");
  return m ? m[1] : null;
}

/** `_ga_<測定IDの G- より後ろ>` クッキーから、進行中のセッションの ID を取り出す */
function sessionIdFromCookie(request: NextRequest): string | null {
  const value = request.cookies.get(`_ga_${GA_MEASUREMENT_ID.slice(2)}`)?.value ?? "";
  // 旧形式: GS1.1.<session_id>.<回数>...　新形式: GS2.1.s<session_id>$o<回数>$...
  const m = /^GS1\.\d+\.(\d+)\./.exec(value) ?? /^GS2\.\d+\.s(\d+)/.exec(value);
  return m ? m[1] : null;
}

function newClientId(): string {
  const random = crypto.getRandomValues(new Uint32Array(1))[0];
  return `${random}.${Math.floor(Date.now() / 1000)}`;
}

function clientIp(request: NextRequest): string | undefined {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
  return ip || undefined;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/**
 * リクエストの内容をもとに、GA4 にイベントを 1 件送る。失敗しても例外は投げない。
 * 応答を待たせないよう、Route Handler からは `after()` の中で呼ぶ。
 */
export async function sendServerEvent(
  request: NextRequest,
  name: string,
  params: Record<string, string | number> = {},
): Promise<void> {
  const url = request.nextUrl;
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) utm[key] = value.slice(0, 100);
  }

  const sessionId = sessionIdFromCookie(request);
  const referrer = request.headers.get("referer");
  const body = {
    client_id: clientIdFromCookie(request) ?? newClientId(),
    // 端末・地域をレポートに出すため、訪問者のものを渡す（サーバーのものにしない）
    user_agent: request.headers.get("user-agent") ?? undefined,
    ip_override: clientIp(request),
    events: [
      {
        name,
        params: {
          ...utm,
          ...params,
          page_location: url.href,
          ...(referrer ? { page_referrer: referrer } : {}),
          ...(sessionId ? { session_id: sessionId } : {}),
          // これが無いと「アクティブ ユーザー」に数えられない
          engagement_time_msec: 1,
        },
      },
    ],
  };

  const ready = GA_MEASUREMENT_ID !== "" && API_SECRET !== "";
  if (DEBUG) console.info("[analytics] ga4(server)", name, body.events[0].params, ready ? "" : "(ID / GA_API_SECRET 未設定: 送信なし)");
  if (!ready) return;

  const query = `measurement_id=${GA_MEASUREMENT_ID}&api_secret=${encodeURIComponent(API_SECRET)}`;
  // 本番のエンドポイントは内容が間違っていても 2xx を返すので、開発時は検証用に送って間違いを見えるようにする
  const endpoint = `https://www.google-analytics.com/${DEBUG ? "debug/" : ""}mp/collect?${query}`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (DEBUG) console.info("[analytics] ga4(server) 検証結果", await res.text());
  } catch (error) {
    // 計測の失敗で転送を止めない
    if (DEBUG) console.warn("[analytics] ga4(server) 送信失敗", error);
  }
}
