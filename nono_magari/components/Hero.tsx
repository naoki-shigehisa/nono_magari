import Image from "next/image";
import { site, type Mode } from "@/content";
import { theme } from "@/lib/theme";
import { modeIcons } from "./ModeIcons";

const MODES: { value: Mode; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "night", label: "Night" },
];

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
};

/** ロゴと Morning / Night の切替 */
export function Hero({ mode, onChange }: Props) {
  const t = theme[mode];
  return (
    <section
      className={`relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden ${t.hero}`}
    >
      {/* 見た目はロゴだけにしたいので、ページの h1 はスクリーンリーダー・検索エンジン向けに視覚的に隠す */}
      <h1 className="sr-only">
        {site.name} | {site.tagline}
      </h1>
      <Image
        src="/nono_logo.png"
        alt={`${site.name} ロゴ`}
        fill
        className={`object-contain transition-[filter,opacity] duration-300 ${t.heroLogo}`}
        priority
      />
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10">
        {/* 太陽 / 月の小さなアイコン。選択中は塗りつぶし、非選択は線画。どちらも控えめな濃さにする */}
        <div className={`flex items-center justify-center ${t.heroSwitch}`}>
          {MODES.map((m) => {
            const selected = m.value === mode;
            const Icon = modeIcons[m.value];
            return (
              <button
                key={m.value}
                type="button"
                aria-label={m.label}
                aria-pressed={selected}
                onClick={() => onChange(m.value)}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-opacity duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-current ${
                  selected ? "opacity-60" : "opacity-25 hover:opacity-60"
                }`}
              >
                <Icon filled={selected} className="transition-[fill] duration-200" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
