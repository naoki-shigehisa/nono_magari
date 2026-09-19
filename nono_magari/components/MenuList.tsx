import type { MenuGroup, Mode } from "@/content";
import { theme } from "@/lib/theme";

type Props = {
  groups: MenuGroup[];
  mode: Mode;
  /** グループが複数あるとき、広い画面では 2 カラムに並べる */
  columns?: boolean;
};

/** 小見出し付きの品目リスト */
export function MenuList({ groups, mode, columns = false }: Props) {
  const t = theme[mode];
  const itemText = mode === "night" ? "text-neutral-200" : t.body;
  return (
    <div className={columns ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3" : "space-y-3"}>
      {groups.map((group, i) => (
        <div key={group.title ?? i}>
          {group.title && (
            <div className={`text-[11px] tracking-widest ${t.subtle}`}>{group.title}</div>
          )}
          <ul className={`mt-0.5 list-none pl-0 text-[14px] sm:text-[15px] leading-6 space-y-1 ${itemText}`}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
