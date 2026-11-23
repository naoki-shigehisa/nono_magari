"use client";
import { useRef, useSyncExternalStore } from "react";
import { catering } from "@/content/catering";
import { captureUtm, isPaidSession, markSubmitted } from "@/lib/analytics";

/**
 * Google フォームの埋め込みと、送信の検知。
 *
 * 【送信の検知の前提】フォームが 1 ページ構成（セクション＝改ページなし）であること。
 * iframe の load イベントを数え、1 回目をフォームの表示、2 回目を送信後の完了画面とみなす。
 * フォームにセクションを足すと「次へ」でも load が起きて回数がずれ、送信前に完了ページへ
 * 移ってしまう。足す場合は、ここの回数（SUBMITTED_LOAD_COUNT）も合わせて直すこと。
 * （Google フォームのページ自体には計測タグを入れられないため、この方法を取っている）
 */
const SUBMITTED_LOAD_COUNT = 2;

const subscribe = () => () => {};

/** 広告から来たセッションだけ、流入元を「Instagramの広告」にした状態で開く */
function getFormSrc(): string {
  // このページに utm 付きで直接来た場合にも効くよう、先に URL の utm を取り込む
  captureUtm();
  return isPaidSession() ? catering.form.embedUrlFromAd : catering.form.embedUrl;
}

export function ApplyForm() {
  // sessionStorage を見てから URL を決めるので、iframe はブラウザ側でだけ描画する
  // （サーバー側で描画して後から src を変えると、load の回数がずれる）
  const src = useSyncExternalStore<string | null>(subscribe, getFormSrc, () => null);
  const loads = useRef(0);

  const onLoad = () => {
    loads.current += 1;
    if (loads.current === SUBMITTED_LOAD_COUNT) {
      markSubmitted();
      window.location.replace(catering.paths.thanks);
    }
  };

  if (!src) return <div className="flex-1 min-h-0 bg-white" />;

  return (
    <iframe
      src={src}
      title={catering.form.title}
      loading="eager"
      onLoad={onLoad}
      className="flex-1 min-h-0 w-full border-0 bg-white"
    />
  );
}
