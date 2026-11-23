import { after, NextResponse, type NextRequest } from "next/server";
import { isCountableVisit, sendServerEvent } from "@/lib/analytics-server";

const DESTINATION = "https://www.instagram.com/nono_magari";

/**
 * /instagram → Instagram のプロフィールへ転送する短縮 URL。
 * HTML を返さないのでブラウザの GA タグでは数えられない。代わりにここからサーバー側で
 * GA4 に `instagram_redirect` を送る（lib/analytics-server.ts）。
 * 送信は `after()` で応答の後に回すので、転送は待たされない。
 */
export function GET(request: NextRequest) {
  if (isCountableVisit(request)) {
    after(() => sendServerEvent(request, "instagram_redirect", { link_url: DESTINATION }));
  }
  return new NextResponse(null, {
    status: 307,
    headers: {
      Location: DESTINATION,
      // 途中でキャッシュされると、2 回目以降のアクセスがここまで届かず数えられない
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
