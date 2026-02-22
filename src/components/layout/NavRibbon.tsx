"use client";

import { usePage, PAGES, PAGE_LABELS, PAGE_NUMBERS } from "@/hooks/use-page";
import { cn } from "@/lib/utils";

export function NavRibbon() {
  const { current, go } = usePage();

  return (
    <nav
      className="flex items-stretch border-b border-ink/20 bg-paper shrink-0"
      style={{ borderTop: "1px solid rgba(26,18,8,0.1)" }}
      aria-label="Sections"
    >
      {PAGES.map((page, i) => {
        const active = current === page;
        return (
          <button
            key={page}
            onClick={() => go(page)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex-1 flex flex-col items-center justify-center py-1 gap-0 transition-colors duration-150",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-ink",
              active
                ? "bg-ink text-paper"
                : "hover:bg-paper-dark text-fade hover:text-ink"
            )}
            style={{
              borderRight: i < PAGES.length - 1 ? "1px solid rgba(26,18,8,0.12)" : "none",
            }}
          >
            <span
              className={cn(
                "block text-center leading-none",
                active ? "opacity-60" : "opacity-40",
              )}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.55rem", fontStyle: "italic" }}
            >
              §{PAGE_NUMBERS[page]}
            </span>
            <span
              className="text-center leading-tight"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              {PAGE_LABELS[page]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
