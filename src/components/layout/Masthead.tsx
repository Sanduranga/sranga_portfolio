"use client";

import { getEditionNumber, getTodayFormatted } from "@/lib/utils";
import type { Developer } from "@/types";

interface Props { developer: Developer }

export function Masthead({ developer }: Props) {
  const edition = getEditionNumber();
  const today = getTodayFormatted();

  return (
    <header className="masthead-vt px-5 pt-2 pb-0 shrink-0">
      {/* Top meta strip */}
      <div className="flex justify-between items-baseline mb-1.5">
        {/* <span className="section-label">
          Est. {new Date("2018-06-01").getFullYear()} &bull; {developer.location}
        </span>
        <span className="section-label">
          Vol. VI &nbsp;No. {edition}
        </span> */}
        <span className="section-label ml-auto">{today}</span>
      </div>

      {/* Heavy top rule */}
      <div className="rule-thick" />
      <div className="mt-[3px] rule-medium" />

      {/* Newspaper name — Gothic blackletter feel using Playfair bold */}
      <div className="py-2 text-center relative">
        {/* Corner flourishes */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#5c4a2a] opacity-40 text-2xl leading-none">✦</span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5c4a2a] opacity-40 text-2xl leading-none">✦</span>

        <h1
          className="text-[2.8rem] leading-none font-black tracking-tight text-ink uppercase"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
        >
          {developer.name}
        </h1>
        <p className="byline mt-0.5">
          {developer.title} 
          {/* &nbsp;·&nbsp; Digital Portfolio &nbsp;·&nbsp; Colombo, Ceylon */}
        </p>
      </div>

      <div className="rule-medium" />
      <div className="mt-[2px] rule-thin" />
    </header>
  );
}
