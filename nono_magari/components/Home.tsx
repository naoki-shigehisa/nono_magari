"use client";
import { useState } from "react";
import { content, type Mode } from "@/content";
import { theme } from "@/lib/theme";
import { Concept } from "./Concept";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Info } from "./Info";
import { InstagramCta } from "./InstagramCta";
import { PastMenus } from "./PastMenus";

/**
 * トップページ本体。
 * Morning / Night の状態をここで持ち、表示内容は content/ から、色は lib/theme から引く。
 */
export function Home() {
  const [mode, setMode] = useState<Mode>("morning");
  const c = content[mode];

  return (
    <div className={`font-sans transition-colors duration-300 ${theme[mode].page}`}>
      <Hero mode={mode} onChange={setMode} />

      {c.concepts.map((section) => (
        <Concept key={section.title} section={section} mode={mode} />
      ))}

      {/* key でモード切替時に選択中のタブをリセットする */}
      <PastMenus key={mode} menus={c.pastMenus} mode={mode} />

      <Info info={c.info} />
      <InstagramCta mode={mode} />
      <Footer />
    </div>
  );
}
