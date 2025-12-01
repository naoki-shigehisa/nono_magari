"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  type Mode = "morning" | "night";
  const [mode, setMode] = useState<Mode>("morning");

  return (
    <div className={`font-sans transition-colors duration-300 ${
      mode === "night" ? "bg-[#555555] text-neutral-100" : "bg-background text-foreground"
    }`}>
      {/* Night global overlay removed: switch to dedicated night assets/colors */}
      {/* Hero */}
      <section className={`relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden ${
        mode === "night" ? "bg-[#5e5e5e]" : "bg-white"
      }`}>
        <Image
          src="/nono_logo.png"
          alt="Hero logo"
          fill
          className={`object-contain transition-[filter,opacity] duration-300 ${mode === "night" ? "invert brightness-110" : ""}`}
          priority
        />
        {/* Mode Switch on hero */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className={`flex items-center justify-center gap-6 sm:gap-8 p-0 ${
            mode === "night" ? "text-neutral-100" : "text-neutral-900"
          }`}>
            <button
              type="button"
              aria-pressed={mode === "morning"}
              onClick={() => setMode("morning")}
              className={`px-0 py-0 text-sm sm:text-base transition-opacity underline-offset-4 decoration-2 decoration-current ${
                mode === "morning" ? "underline opacity-100" : "no-underline opacity-70 hover:opacity-100"
              }`}
            >
              Morning
            </button>
            <button
              type="button"
              aria-pressed={mode === "night"}
              onClick={() => setMode("night")}
              className={`px-0 py-0 text-sm sm:text-base transition-opacity underline-offset-4 decoration-2 decoration-current ${
                mode === "night" ? "underline opacity-100" : "no-underline opacity-70 hover:opacity-100"
              }`}
            >
              Night
            </button>
          </div>
        </div>
      </section>

      {mode === "morning" ? (
        <>
          {/* Concept - Morning */}
          <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-2xl font-semibold text-neutral-900">一日のはじまりに、余白とやすらぎを。</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                旬の食材、心地よい空間、素材の味を大切に。<br/>
                東京の真ん中で、やさしい朝ごはんをどうぞ。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
              <Image src="/nono_3.jpg" alt="nono_3" fill className="object-cover" />
            </div>
          </section>

          {/* Ingredient - Morning */}
          <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-2xl font-semibold text-neutral-900">こだわりの素材を大切に</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                手を加えすぎず、でも手を抜かない。<br/>
                旬を迎えた野菜、旨味ののった出汁、米の香り。<br/>
                必要以上に味を重ねず、素材が持つ輪郭をそのまま味わっていただく。<br/>
                そんな静かな料理を、一つひとつ丁寧に仕立てています。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
              <Image src="/nono_1.jpg" alt="nono_1" fill className="object-cover" />
            </div>
          </section>

          {/* Past Menus */}
          <section className="px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-[1024px] mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold text-center">PAST MENUS</h3>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* vol.1 */}
                <article className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5">
                  <div className="relative w-full aspect-[4/3]">
                    <Image src="/menu_1.jpg" alt="2025/8/30 PRE-OPENING" fill className="object-cover" />
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-[12px] tracking-widest text-neutral-500 font-mono tabular-nums">
                      2025/8/30
                      <span className="ml-3 align-[0.05em] font-sans uppercase tracking-[0.25em] text-neutral-400">PRE-OPENING</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-[13px] sm:text-sm leading-7 text-neutral-700">
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ささ結</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>那須御養卵 極</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>本カマスの天日干し</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>トマトとほうれん草の味噌汁</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ぬか漬け</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ナスの焼き浸し</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>海苔の佃煮</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>お茶 冴えあかり</li>
                    </ul>
                  </div>
                </article>
                {/* vol.2 */}
                <article className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5">
                  <div className="relative w-full aspect-[4/3]">
                    <Image src="/menu_2.jpg" alt="2025/9/28" fill className="object-cover" />
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-[12px] tracking-widest text-neutral-500 font-mono tabular-nums">2025/9/28</div>
                    <ul className="mt-2 space-y-1 text-[13px] sm:text-sm leading-7 text-neutral-700">
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ささ結</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>那須御養卵 極</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>銀ジャケ</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>かぼちゃと豚肉の豆乳みそ汁</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ぬか漬け</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ナスの焼き浸し</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>海苔の佃煮</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>有機ほうじ茶 八万寿</li>
                    </ul>
                  </div>
                </article>
                {/* vol.3 */}
                <article className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5">
                  <div className="relative w-full aspect-[4/3]">
                    <Image src="/nono_2.jpg" alt="2025/10/26" fill className="object-cover" />
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-[12px] tracking-widest text-neutral-500 font-mono tabular-nums">2025/10/26</div>
                    <ul className="mt-2 space-y-1 text-[13px] sm:text-sm leading-7 text-neutral-700">
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ひとめぼれ</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>谷町納豆</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>トロ鯖味醂干し</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>豚汁</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>焼ききのこの白和え</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>ほうれん草のお浸し</li>
                      <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-[10px] h-1 w-1 rounded-full bg-neutral-400/60"></span>煎茶 煎</li>
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Info / Access */}
          <section className="flex justify-center px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-[1024px] text-center">
              <h3 className="text-xl sm:text-2xl font-semibold">朝ごはん 野々</h3>
              <ul className="mt-4 space-y-2 text-sm sm:text-base">
                <li>NEXT OPEN 12/7 (日)</li>
                <li>OPEN 10:00 / CLOSE 13:00 (L.O. 12:30)</li>
                <li>東京都杉並区宮前5-9-8 okatte にしおぎ</li>
              </ul>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Night - Coming soon */}
          <section className="px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-[1024px] mx-auto text-center">
              <h3 className="text-2xl md:text-2xl font-semibold text-neutral-100">居酒屋 野々</h3>
              <div className="max-w-[1024px] mx-auto text-center">
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>Coming soon...</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Night - Photo */}
          <section className="px-6 sm:px-10 py-12 sm:py-16">
            <div className="mt-8 mx-auto max-w-[720px] aspect-[3/2] relative rounded-xl overflow-hidden bg-white/10 shadow-md">
              <Image src="/nono_4.jpg" alt="店内の様子" fill className="object-cover" />
            </div>
          </section>
        </>
      )}

      {/* Instagram CTA */}
      <section className="px-6 sm:px-10 py-12">
        <div className="max-w-[1024px] mx-auto text-center">
          <div className="text-sm opacity-70">Follow us on Instagram</div>
          <a
            href="https://instagram.com/nono_magari"
            rel="noopener noreferrer"
            aria-label="Instagram @nono_magari"
            className={`inline-flex items-center justify-center mt-1 text-base sm:text-lg px-3 py-2 rounded underline underline-offset-4 sm:no-underline transition-colors focus:outline-none ${
              mode === "night"
                ? "text-neutral-100 hover:opacity-90 focus-visible:ring-1 focus-visible:ring-neutral-100/30 active:opacity-80"
                : "text-neutral-900 hover:opacity-80 focus-visible:ring-1 focus-visible:ring-neutral-900/20 active:opacity-90"
            }`}
          >
            <span>@nono_magari</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm">
        <p>Copyright © 2025 野々</p>
      </footer>
    </div>
  );
}
