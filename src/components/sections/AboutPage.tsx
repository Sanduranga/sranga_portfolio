"use client";

import { useEffect, useRef } from "react";
import type { PortfolioData } from "@/types";
import { skillWidth, skillLabel, cn } from "@/lib/utils";

interface Props { data: PortfolioData; isActive: boolean }

export function AboutPage({ data, isActive }: Props) {
  const { developer, skills } = data;
  const barsRef = useRef<HTMLDivElement>(null);

  // Animate skill bars when page becomes active
  useEffect(() => {
    if (!isActive || !barsRef.current) return;
    const fills = barsRef.current.querySelectorAll<HTMLDivElement>(".skill-fill");
    fills.forEach((el) => {
      const target = el.dataset["width"] ?? "0%";
      el.style.width = "0%";
      requestAnimationFrame(() => { el.style.width = target; });
    });
  }, [isActive]);

  return (
    <div className={cn("h-full overflow-y-auto", isActive && "page-enter")}>
      <div className="p-4">
        {/* Section header */}
        <div className="mb-3" style={{ borderBottom: "1px solid rgba(26,18,8,0.2)", paddingBottom: "0.5rem" }}>
          <p className="section-label">§ II — Personal File</p>
          <h2 className="headline-1">About the Correspondent</h2>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Bio + philosophy */}
          <div className="col-span-5 col-rule pr-4">
            <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)", paddingBottom: "0.25rem" }}>
              Biography
            </p>
            <p className="body-copy drop-cap mb-3">{developer.bio}</p>

            {/* Philosophy pull-quote */}
            <div className="my-3 py-3 px-3 relative" style={{ borderLeft: "3px solid var(--ink)", borderRight: "3px solid var(--ink)" }}>
              <p className="section-label mb-1 text-center">Philosophy</p>
              <p className="body-copy text-xs italic text-center leading-relaxed">
                "Code is craft. Every function, every contract, every interface deserves
                deliberate thought. I write software that is easy to delete, easy to
                understand, and hard to break."
              </p>
            </div>

            {/* Social */}
            <div style={{ borderTop: "1px solid rgba(26,18,8,0.15)", paddingTop: "0.5rem" }}>
              <p className="section-label mb-1.5">Direct Channels</p>
              {developer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-1 hover:underline"
                  style={{ borderBottom: "1px solid rgba(26,18,8,0.08)" }}
                >
                  <span className="section-label w-16">{link.platform}</span>
                  <span className="body-copy text-xs">{link.url.replace("https://", "")}</span>
                </a>
              ))}
              {developer.resumeUrl && (
                <a
                  href={developer.resumeUrl}
                  className="block mt-2 byline px-3 py-1 text-center border-2 border-ink hover:bg-ink hover:text-paper transition-colors"
                >
                  Download Résumé
                </a>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="col-span-7 pl-4" ref={barsRef}>
            <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)", paddingBottom: "0.25rem" }}>
              Technical Arsenal — Full Field Report
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {skills.map((group) => (
                <div key={group.category} className="mb-3">
                  <p className="headline-3 italic mb-2" style={{ fontSize: "0.85rem" }}>{group.category}</p>
                  <div className="space-y-2">
                    {group.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="body-copy text-xs">{skill.name}</span>
                          <span className="caption">{skillLabel[skill.level]}</span>
                        </div>
                        <div className="skill-track">
                          <div
                            className="skill-fill"
                            data-width={skillWidth[skill.level]}
                            style={{ width: isActive ? skillWidth[skill.level] : "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
