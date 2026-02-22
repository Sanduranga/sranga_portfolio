"use client";

import type { PortfolioData } from "@/types";
import { cn } from "@/lib/utils";

interface Props { data: PortfolioData; isActive: boolean }

export function ExperiencePage({ data, isActive }: Props) {
  const { experience } = data;

  return (
    <div className={cn("h-full overflow-y-auto", isActive && "page-enter")}>
      <div className="p-4">
        <div className="mb-3" style={{ borderBottom: "1px solid rgba(26,18,8,0.2)", paddingBottom: "0.5rem" }}>
          <p className="section-label">§ IV — Curriculum Vitæ</p>
          <h2 className="headline-1">Professional Record</h2>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: "7.5rem", width: "1px", background: "rgba(26,18,8,0.18)" }}
          />

          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={exp.id} className="grid grid-cols-12 gap-3">
                {/* Date */}
                <div className="col-span-3 text-right pr-3 pt-0.5">
                  <p className="caption leading-tight">{exp.period}</p>
                  {exp.current && (
                    <p className="caption text-green-800 font-bold mt-0.5">● Current</p>
                  )}
                </div>

                {/* Node */}
                <div className="col-span-1 flex justify-center pt-1.5 relative z-10">
                  <div
                    className="w-3 h-3 border-2 border-ink"
                    style={{ background: exp.current ? "var(--ink)" : "var(--paper)" }}
                  />
                </div>

                {/* Content */}
                <div className="col-span-8">
                  <div className="ink-box hover:border-ink/40 transition-colors">
                    <div className="pb-2 mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)" }}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="headline-3">{exp.role}</h3>
                        <span className="caption">{exp.location}</span>
                      </div>
                      <p className="byline mt-0.5 text-fade">@ {exp.company}</p>
                    </div>

                    <p className="body-copy text-xs mb-2">{exp.description}</p>

                    <div className="mb-2">
                      <p className="section-label mb-1">Key Achievements</p>
                      <ul className="space-y-1">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="flex gap-2 body-copy text-xs">
                            <span className="text-fade shrink-0 mt-px">›</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2" style={{ borderTop: "1px solid rgba(26,18,8,0.1)" }}>
                      {exp.tech.map((t) => (
                        <span key={t} className="caption px-1.5 py-0.5" style={{ background: "rgba(26,18,8,0.05)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
