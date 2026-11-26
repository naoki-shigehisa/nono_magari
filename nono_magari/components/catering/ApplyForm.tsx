"use client";
import { useRef, useSyncExternalStore } from "react";
import { catering } from "@/content/catering";
import { markSubmitted } from "@/lib/analytics";

/**
 * 簡易フォーム（Google フォーム）の埋め込みと、送信の検知。
 *
 * 【送信の検知の前提】フォームが 1 ページ構成（セクション＝改ページなし）であること。
 * iframe の load イベントを数え、1 回目をフォームの表示、2 回目を送信後の完了画面とみなす。
 * フォームにセクションを足すと「次へ」でも load が起きて回数がずれ、送信前に完了ページへ
 * 移ってしまう。足す場合は、ここの回数（SUBMITTED_LOAD_COUNT）も合わせて直すこと。
 * （Google フォームのページ自体には計測タグを入れられないため、この方法を取っている）
 */
const SUBMITTED_LOAD_COUNT = 2;

const subscribe = () => () => {};

export function ApplyForm() {
  // iframe はブラウザ側でだけ描画する（サーバー側で描画すると、onLoad が付く前に
  // 1 回目の load が終わることがあり、回数がずれる）
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const loads = useRef(0);

  const onLoad = () => {
    loads.current += 1;
    if (loads.current === SUBMITTED_LOAD_COUNT) {
      markSubmitted();
      window.location.replace(catering.paths.thanks);
    }
  };

  if (!mounted) return <div className="flex-1 min-h-0 bg-white" />;

  return (
    <iframe
      src={catering.form.embedUrl}
      title={catering.form.title}
      loading="eager"
      onLoad={onLoad}
      className="flex-1 min-h-0 w-full border-0 bg-white"
    />
  );
}
