"use client";

import { usePage, PAGES, PAGE_LABELS, PAGE_NUMBERS } from "@/hooks/use-page";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PageTurner() {
  const { current, go, goNext, goPrev, isPending } = usePage();
  const idx = PAGES.indexOf(current);
  const hasPrev = idx > 0;
  const hasNext = idx < PAGES.length - 1;
  const nextPage = hasNext ? PAGES[idx + 1]! : null;
  const prevPage = hasPrev ? PAGES[idx - 1]! : null;

  return (
    <aside
      className="fixed z-40 h-auto top-1/2 -translate-y-1/2 right-0 flex flex-col items-center justify-between py-3 border-l shrink-0"
      style={{ borderColor: "rgba(26,18,8,0.15)" }}
    >
      {/* Previous */}
      <div className="flex flex-col items-center gap-1">
        {prevPage && (
          <button
            onClick={goPrev}
            disabled={isPending}
            title={`← ${PAGE_LABELS[prevPage]}`}
            aria-label={`Previous: ${PAGE_LABELS[prevPage]}`}
            className={cn(
              "group flex flex-col items-center gap-1 px-1.5 py-2 border transition-all",
              "border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-ink",
              "disabled:opacity-40 disabled:cursor-not-allowed text-ink"
            )}
          >
           <ChevronLeft />
          </button>
        )}
      </div>

      {/* Centre: page indicator */}
      <div className="flex flex-col items-center gap-2">
        {/* Progress pips */}
        <div className="flex flex-col gap-1">
          {PAGES.map((p, i) => (
            <button
              key={p}
              onClick={() => go(p)}
              title={PAGE_LABELS[p]}
              aria-label={PAGE_LABELS[p]}
              className="w-1 rounded-none transition-all focus:outline-none"
              style={{
                height: p === current ? "18px" : "6px",
                background: p === current ? "var(--ink)" : "rgba(26,18,8,0.2)",
              }}
            />
          ))}
        </div>

        {/* Page number */}
        <span
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.6rem", fontStyle: "italic", color: "var(--fade)" }}
        >
          {idx + 1}/{PAGES.length}
        </span>
      </div>

      {/* Next — primary action */}
      <div className="flex flex-col items-center gap-1 pr-1">
        {nextPage && (
          <button
            onClick={goNext}
            disabled={isPending}
            title={`${PAGE_LABELS[nextPage]} →`}
            aria-label={`Next: ${PAGE_LABELS[nextPage]}`}
            className={cn(
              "group flex flex-col rounded-full items-center gap-1 px-1.5 py-2 transition-all",
              "bg-ink/40 text-paper border border-ink/50",
              "hover:bg-ink/80",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ink",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
<ChevronRight/>
          </button>
        )}

        {!nextPage && (
          <div className="flex flex-col items-center gap-1 opacity-30">
            <div className="w-5 h-px bg-ink" />
            <span style={{ writingMode: "vertical-rl", fontFamily: "'Special Elite'", fontSize: "0.55rem", color: "var(--fade)" }}>
              Fin
            </span>
            <div className="w-5 h-px bg-ink" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:0.4; }
          50% { opacity:1; }
        }
      `}</style>
    </aside>
  );
}
