import { morning } from "./morning";
import { night } from "./night";
import type { Mode, ModeContent } from "./types";

export * from "./types";
export { site } from "./site";

/** モードごとの表示内容 */
export const content: Record<Mode, ModeContent> = { morning, night };
