import { Fragment } from "react";
import Image from "next/image";
import type { ConceptSection, Mode } from "@/content";
import { CONTENT_WIDTH, SECTION_X, theme } from "@/lib/theme";

type Props = {
  section: ConceptSection;
  mode: Mode;
};

/** 見出し + 本文（左）と写真（右）の 2 カラム。スマホでは写真が上 */
export function Concept({ section, mode }: Props) {
  const t = theme[mode];
  return (
    <section
      className={`${SECTION_X} py-16 sm:py-24 ${CONTENT_WIDTH} mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}
    >
      <div className="order-2 md:order-1">
        <h2 className={`text-2xl md:text-2xl ${t.heading}`}>{section.title}</h2>
        <p className={`mt-4 text-sm sm:text-base leading-relaxed ${t.body}`}>
          {section.lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      </div>
      <div className={`order-1 md:order-2 aspect-[4/3] relative rounded-xl overflow-hidden ${t.imageFrame}`}>
        <Image src={section.image.src} alt={section.image.alt} fill className="object-cover" />
      </div>
    </section>
  );
}
