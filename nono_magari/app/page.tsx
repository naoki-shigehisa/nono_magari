"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  type Mode = "morning" | "night";
  const [mode, setMode] = useState<Mode>("morning");

  return (
    <div className={`font-sans transition-colors duration-300 ${
      mode === "night" ? "bg-[#2a2a2a] text-neutral-100" : "bg-background text-foreground"
    }`}>
      {/* Night global overlay removed: switch to dedicated night assets/colors */}
      {/* Hero */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={mode === "night" ? "/nono_logo_grey.jpg" : "/nono_logo.jpg"}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Mode Switch on hero */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 bg-white/80 backdrop-blur rounded-full p-1 shadow-md">
            <button
              type="button"
              aria-pressed={mode === "morning"}
              onClick={() => setMode("morning")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border text-sm sm:text-base transition-colors ${
                mode === "morning"
                  ? "bg-white text-neutral-900 border-black/10 shadow"
                  : "bg-transparent text-neutral-700 border-transparent hover:bg-white/70"
              }`}
            >
              Morning
            </button>
            <button
              type="button"
              aria-pressed={mode === "night"}
              onClick={() => setMode("night")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border text-sm sm:text-base transition-colors ${
                mode === "night"
                  ? "bg-white text-neutral-900 border-black/10 shadow"
                  : "bg-transparent text-neutral-700 border-transparent hover:bg-white/70"
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
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">一日のはじまりに、余白とやすらぎを。</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                旬の食材、心地よい空間、素材の味を大切に。東京の真ん中で、やさしい朝ごはんをどうぞ。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
              <Image src="/nono_3.jpg" alt="nono_3" fill className="object-cover" />
            </div>
          </section>

          {/* Ingredient - Morning */}
          <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">こだわりの素材</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                1つ1つの素材にこだわった朝ごはんをお楽しみください。
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
              <Image src="/nono_4.jpg" alt="nono_4" fill className="object-cover" />
            </div>
          </section>

          {/* Info / Access */}
          <section className="flex justify-center px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-[1024px] text-center">
              <h3 className="text-xl sm:text-2xl font-semibold">野々</h3>
              <ul className="mt-4 space-y-2 text-sm sm:text-base">
                <li>OPEN 10:00 / CLOSE 13:00</li>
                <li>NEXT OPEN 10/26 (日)</li>
                <li>東京都杉並区宮前5-9-8 okatte にしおぎ</li>
              </ul>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Night - Coming soon */}
          <section className="px-6 sm:px-10 py-24 sm:py-40 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-100">coming soon...</h2>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm">
        <p>Copyright © 2025 野々</p>
      </footer>
    </div>
  );
}
