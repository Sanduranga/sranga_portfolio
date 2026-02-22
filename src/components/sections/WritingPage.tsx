"use client";

import { useState } from "react";
import type { PortfolioData, Article } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface Props { data: PortfolioData; isActive: boolean }

export function WritingPage({ data, isActive }: Props) {
  const { articles } = data;
  const [selected, setSelected] = useState<Article>(articles[0]!);
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className={cn("h-full flex flex-col overflow-hidden", isActive && "page-enter")}>
      <div className="px-4 pt-3 pb-2 shrink-0">
        <p className="section-label">§ V — Editorial</p>
        <h2 className="headline-1">From The Desk</h2>
        <div className="rule-medium mt-1" />
      </div>

      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden px-4 pb-3">
        {/* Article list */}
        <div className="col-span-5 col-rule pr-4 overflow-y-auto">
          {featured.length > 0 && (
            <div className="mb-3">
              <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)", paddingBottom: "0.25rem" }}>
                Editor's Selection
              </p>
              <div className="space-y-3">
                {featured.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className={cn(
                      "w-full text-left transition-opacity",
                      selected.id === a.id ? "opacity-100" : "opacity-60 hover:opacity-90"
                    )}
                  >
                    <p className="caption mb-0.5">{formatDate(a.publishedAt)} · {a.readingTime} min read</p>
                    <h3 className={cn("headline-3 mb-1", selected.id === a.id && "underline")}>{a.title}</h3>
                    <p className="body-copy text-xs text-fade line-clamp-2">{a.excerpt}</p>
                    <div className="flex gap-1 mt-1">
                      {a.tags.slice(0, 2).map((t) => (
                        <span key={t} className="caption px-1 py-0.5" style={{ background: "rgba(26,18,8,0.06)" }}>{t}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div>
              <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)", paddingBottom: "0.25rem" }}>
                Further Reading
              </p>
              <div className="space-y-0">
                {rest.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className={cn(
                      "w-full text-left py-2 transition-opacity",
                      selected.id === a.id ? "opacity-100" : "opacity-60 hover:opacity-90"
                    )}
                    style={{ borderBottom: "1px solid rgba(26,18,8,0.08)" }}
                  >
                    <p className="caption mb-0.5">{formatDate(a.publishedAt)}</p>
                    <h4 className={cn("headline-3 text-xs", selected.id === a.id && "underline")}>{a.title}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Article preview */}
        <div className="col-span-7 pl-4 overflow-y-auto">
          <div key={selected.id}>
            <div className="pb-3 mb-3" style={{ borderBottom: "2px solid var(--ink)" }}>
              <div className="flex flex-wrap gap-1 mb-2">
                {selected.tags.map((t) => (
                  <span key={t} className="byline px-2 py-0.5 border border-ink/30">{t}</span>
                ))}
              </div>
              <h2 className="headline-2 mb-1">{selected.title}</h2>
              <p className="byline">{formatDate(selected.publishedAt)} &nbsp;·&nbsp; {selected.readingTime} minute read</p>
            </div>

            <p className="body-copy drop-cap mb-4">{selected.excerpt}</p>

            {/* Read more CTA */}
            <div className="ink-box text-center py-4">
              <p className="section-label mb-1">Full Article</p>
              <p className="body-copy text-xs italic text-fade mb-3">
                Published externally. Follow the link to read the complete piece.
              </p>
              <button className="byline px-5 py-1.5 border-2 border-ink hover:bg-ink hover:text-paper transition-colors">
                Read Full Article →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
