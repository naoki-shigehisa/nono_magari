import Image from "next/image";
import type { Mode } from "@/content";
import { theme } from "@/lib/theme";

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
      <Image
        src="/nono_logo.png"
        alt="Hero logo"
        fill
        className={`object-contain transition-[filter,opacity] duration-300 ${t.heroLogo}`}
        priority
      />
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className={`flex items-center justify-center gap-6 sm:gap-8 p-0 ${t.heroSwitch}`}>
          {MODES.map((m) => {
            const selected = m.value === mode;
            return (
              <button
                key={m.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(m.value)}
                className={`px-0 py-0 text-sm sm:text-base transition-opacity underline-offset-4 decoration-2 decoration-current ${
                  selected ? "underline opacity-100" : "no-underline opacity-70 hover:opacity-100"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
