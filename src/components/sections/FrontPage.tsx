"use client";

import { usePage } from "@/hooks/use-page";
import type { PortfolioData } from "@/types";
import { cn } from "@/lib/utils";

interface Props { data: PortfolioData; isActive: boolean }

export function FrontPage({ data, isActive }: Props) {
  const { developer, projects, articles, experience } = data;
  const { go } = usePage();
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const latest = articles.slice(0, 3);
  const currentJob = experience.find((e) => e.current);

  return (
    <div className={cn("h-full overflow-y-auto", isActive && "page-enter")}>
      <div className="p-4 h-full">
        {/* ── Lead story ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-0 mb-3" style={{ borderBottom: "2px solid var(--ink)", paddingBottom: "0.75rem" }}>
          {/* Main column */}
          <div className="col-span-8 pr-4 col-rule">
            {/* <p className="section-label mb-1">◆ Developer Profile — Exclusive Interview</p> */}
            <h2 className="headline-1 mb-2">{developer.tagline}</h2>

            {/* Deck */}
            <p className="deck mb-3">
              {developer.location} correspondent brings six years of full-stack expertise to bear on the region's most demanding digital projects.
            </p>

            {/* Ornament */}
            <div className="ornament mb-3">
              <span className="section-label">Continue reading below</span>
            </div>

            <p className="body-copy drop-cap mb-3">{developer.bio}</p>

            {/* CTA buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => go("projects")}
                className="byline px-4 py-1.5 border-2 border-ink hover:bg-ink hover:text-paper transition-colors"
              >
                View Works →
              </button>
              <button
                onClick={() => go("contact")}
                className="byline px-4 py-1.5 bg-ink text-paper hover:bg-ink/80 transition-colors"
              >
                Send Dispatch
              </button>
            </div>
          </div>

          {/* Side column */}
          <div className="col-span-4 pl-4">
            {/* Vitals box */}
            {/* <div className="ink-box mb-3">
              <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.2)", paddingBottom: "0.3rem" }}>
                Correspondent Dossier
              </p>
              <div className="space-y-2">
                {[
                  { label: "Station", value: developer.location },
                  { label: "Current Post", value: `${currentJob?.role} @ ${currentJob?.company}` },
                  { label: "Experience", value: "6 Years, 30+ Projects" },
                  {
                    label: "Status",
                    value: developer.availability === "available" ? "● Open for Engagements" : "○ Unavailable",
                    className: developer.availability === "available" ? "status-available font-bold" : "status-unavailable",
                  },
                ].map(({ label, value, className }) => (
                  <div key={label}>
                    <p className="section-label">{label}</p>
                    <p className={cn("body-copy text-xs leading-tight", className)}>{value}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Social links */}
            <div>
              <p className="section-label mb-1.5" style={{ borderBottom: "1px solid rgba(26,18,8,0.2)", paddingBottom: "0.3rem" }}>
                Wire Services
              </p>
              {developer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block byline py-1 hover:underline text-ink"
                  style={{ borderBottom: "1px solid rgba(26,18,8,0.08)" }}
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Below the fold: featured works ─────────────────────────────────── */}
        <div className="mb-3">
          <div className="ornament mb-2">
            <span className="section-label">Recent Dispatches</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featured.map((project, i) => (
              <div
                key={project.id}
                className={cn("cursor-pointer group", i === 0 && "col-rule pr-4")}
                onClick={() => go("projects")}
              >
                <p className="section-label mb-1">
                  {project.category} · {project.year}
                  {project.status === "live" && <span className="ml-1 text-green-800">● Live</span>}
                </p>
                <h3 className="headline-3 mb-1 group-hover:underline">{project.title}</h3>
                <p className="deck text-xs mb-1">{project.headline}</p>
                {project.impact && (
                  <p className="caption">Impact: {project.impact}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="caption px-1.5 py-0.5" style={{ background: "rgba(26,18,8,0.06)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tertiary: latest writing ────────────────────────────────────────── */}
        <div style={{ borderTop: "2px solid var(--ink)", paddingTop: "0.6rem" }}>
          <div className="flex justify-between items-baseline mb-2">
            <p className="section-label">From The Desk</p>
            <button onClick={() => go("writing")} className="caption hover:underline">All articles →</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {latest.map((article, i) => (
              <div key={article.id} className={cn(i < 2 && "col-rule pr-3")}>
                <p className="caption mb-0.5">{article.publishedAt} · {article.readingTime} min</p>
                <h4 className="headline-3 text-xs mb-1">{article.title}</h4>
                <p className="body-copy text-xs leading-relaxed line-clamp-2 text-fade">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
