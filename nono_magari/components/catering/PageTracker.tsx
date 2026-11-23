"use client";
import { useEffect } from "react";
import { captureUtm, consumeSubmitted, debugPageView, recallFormPosition, track } from "@/lib/analytics";

type Props = {
  page: "lp" | "apply" | "thanks";
};

/**
 * ページを開いたときの計測。画面には何も出さない。
 * - どのページでも: URL の utm_* をセッションにおぼえる
 * - apply: 「申込みを始めた」を送る（1 セッション 1 回）
 * - thanks: 送信済みの印があるときだけ「送信した」を 1 回送り、印を消す
 */
export function PageTracker({ page }: Props) {
  useEffect(() => {
    captureUtm();
    debugPageView();
    if (page === "apply") {
      track("contact_start", { method: "form", position: recallFormPosition() });
    }
    if (page === "thanks" && consumeSubmitted()) {
      track("lead");
    }
  }, [page]);

  return null;
}
