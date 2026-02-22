"use client";

import { useState } from "react";
import type { PortfolioData, Project } from "@/types";
import { cn } from "@/lib/utils";

interface Props { data: PortfolioData; isActive: boolean }

const statusLabel: Record<string, string> = { live: "Live", archived: "Archived", wip: "In Progress" };

export function ProjectsPage({ data, isActive }: Props) {
  const { projects } = data;
  const [selected, setSelected] = useState<Project>(projects[0]!);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className={cn("h-full flex flex-col overflow-hidden", isActive && "page-enter")}>
      <div className="px-4 pt-3 pb-2 shrink-0">
        <p className="section-label">§ III — Portfolio</p>
        <div className="flex justify-between items-end">
          <h2 className="headline-1">Notable Works</h2>
          {/* Category filter */}
          <div className="flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "byline px-2 py-0.5 border transition-colors",
                  filter === cat
                    ? "bg-ink text-paper border-ink"
                    : "border-ink/30 hover:border-ink/60"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="rule-medium mt-1" />
      </div>

      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden px-4 pb-3">
        {/* List */}
        <div className="col-span-4 col-rule pr-4 overflow-y-auto">
          {filtered.map((project, i) => {
            const active = selected.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className={cn(
                  "w-full text-left py-3 transition-opacity",
                  active ? "opacity-100" : "opacity-55 hover:opacity-80",
                  i < filtered.length - 1 && "border-b"
                )}
                style={{ borderColor: "rgba(26,18,8,0.1)" }}
              >
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="section-label">{project.category} · {project.year}</span>
                  <span className={cn("caption", project.status === "live" ? "text-green-800" : "")}>
                    {project.status === "live" ? "● " : ""}{statusLabel[project.status]}
                  </span>
                </div>
                <h3 className={cn("headline-3 mb-0.5", active && "underline")}>{project.title}</h3>
                <p className="body-copy text-xs text-fade leading-snug line-clamp-2">{project.headline}</p>
                {project.impact && active && (
                  <p className="caption mt-1 text-green-800">↑ {project.impact}</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="col-span-8 pl-4 overflow-y-auto">
          <div key={selected.id}>
            <div className="pb-3 mb-3" style={{ borderBottom: "2px solid var(--ink)" }}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="section-label mb-1">
                    {selected.category} · {selected.year} · {selected.role}
                  </p>
                  <h2 className="headline-2 mb-1">{selected.title}</h2>
                  <p className="deck">{selected.headline}</p>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="byline px-3 py-1 border-2 border-ink hover:bg-ink hover:text-paper transition-colors whitespace-nowrap block text-center"
                    >
                      Live →
                    </a>
                  )}
                  {selected.repoUrl && (
                    <a
                      href={selected.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="byline px-3 py-1 border border-ink/40 hover:border-ink transition-colors whitespace-nowrap block text-center"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
              {selected.impact && (
                <div className="mt-2 px-3 py-1.5 inline-block" style={{ background: "rgba(26,18,8,0.06)", border: "1px solid rgba(26,18,8,0.15)" }}>
                  <p className="caption">Measured Impact: <span className="font-bold text-ink">{selected.impact}</span></p>
                </div>
              )}
            </div>

            <p className="body-copy mb-4 drop-cap">{selected.longDescription}</p>

            <div style={{ borderTop: "1px solid rgba(26,18,8,0.2)", paddingTop: "0.75rem" }}>
              <p className="section-label mb-2">Technology Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.tech.map((t) => (
                  <span key={t} className="caption px-2 py-0.5 border" style={{ borderColor: "rgba(26,18,8,0.25)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
