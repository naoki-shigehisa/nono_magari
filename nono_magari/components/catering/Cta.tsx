"use client";
import type { MouseEvent, ReactNode } from "react";
import { catering } from "@/content/catering";
import { rememberFormPosition, track, type ContactMethod, type CtaPosition } from "@/lib/analytics";

/** 押しやすい高さ（44px 以上）を確保した共通の形 */
const BASE =
  "inline-flex items-center justify-center gap-1.5 min-h-12 px-2 rounded-full text-sm tracking-[0.06em] whitespace-nowrap transition-opacity hover:opacity-85 active:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current";

/** 塗りのボタン（主） */
const FILLED = "bg-[#fbf7ea] text-[#4a2c14] font-bold";
/** 細線の角丸（CR のボタンと同じ形） */
const OUTLINE = "border border-current";

/** 外部リンクへ移る前に、イベントの送信を待つ時間（ミリ秒） */
const NAVIGATE_DELAY_MS = 150;

/** CR のボタンに付いている紙飛行機 */
function PaperPlane() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="shrink-0"
    >
      <path d="M21 4 3 10.2l7.6 2.6L13.4 20 21 4Z" />
      <path d="M10.6 12.8 21 4" />
    </svg>
  );
}

/**
 * 外部リンク（DM、フォームへの直接リンク）用のクリック処理。
 * イベントを送ってから移動する。新しく送ったときだけ少し待ち、送信済みならすぐ移動する。
 */
function trackThenNavigate(method: ContactMethod, position: CtaPosition) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const sent = track("contact_start", { method, position });
    // 別タブで開く操作（Ctrl / Cmd + クリックなど）はブラウザに任せる
    if (!sent || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const href = e.currentTarget.href;
    e.preventDefault();
    window.setTimeout(() => {
      window.location.href = href;
    }, NAVIGATE_DELAY_MS);
  };
}

type CtaProps = {
  position: CtaPosition;
  className?: string;
  children?: ReactNode;
};

/** 「フォームで申し込む」。計測は /catering/apply を開いたときに行う */
export function FormCta({ position, className = "", children }: CtaProps) {
  return (
    // タグが読み込み時にページ表示を送るので、ページ間はふつうのリンクで読み込み直す
    <a
      href={catering.paths.apply}
      onClick={() => rememberFormPosition(position)}
      className={`${BASE} ${FILLED} ${className}`}
    >
      {children ?? catering.cta.form}
    </a>
  );
}

/** 「DMで相談する」。Instagram の DM を直接開く */
export function DmCta({ position, className = "", children }: CtaProps) {
  return (
    <a
      href={catering.dmUrl}
      rel="noopener noreferrer"
      onClick={trackThenNavigate("instagram_dm", position)}
      className={`${BASE} ${OUTLINE} ${className}`}
    >
      <span>{children ?? catering.cta.dm}</span>
      <PaperPlane />
    </a>
  );
}

/** Google フォームを直接開くリンク（埋め込みがうまく表示されないとき用） */
export function FormDirectLink({ position, className = "", children }: CtaProps) {
  return (
    <a
      href={catering.form.directUrl}
      rel="noopener noreferrer"
      onClick={trackThenNavigate("form_direct", position)}
      className={className}
    >
      {children}
    </a>
  );
}

/** フォームと DM のボタンを横に 2 つ並べる */
export function CtaPair({ position, id }: { position: CtaPosition; id?: string }) {
  return (
    <div id={id} className="grid grid-cols-2 gap-3">
      <FormCta position={position} />
      <DmCta position={position} />
    </div>
  );
}
