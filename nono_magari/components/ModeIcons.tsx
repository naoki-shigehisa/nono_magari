import type { Mode } from "@/content";

type IconProps = {
  /** 選択中は塗りつぶし、非選択は線画 */
  filled: boolean;
  className?: string;
};

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function SunIcon({ filled, className }: IconProps) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <circle cx="12" cy="12" r={filled ? 4.5 : 4} />
      <path
        fill="none"
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      />
    </svg>
  );
}

export function MoonIcon({ filled, className }: IconProps) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export const modeIcons: Record<Mode, (props: IconProps) => React.JSX.Element> = {
  morning: SunIcon,
  night: MoonIcon,
};
