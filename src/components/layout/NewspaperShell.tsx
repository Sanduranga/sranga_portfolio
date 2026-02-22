"use client";

import { Activity } from "react"; // React 19.2 <Activity> component
import { PageProvider, usePage, PAGES } from "@/hooks/use-page";
import { Masthead } from "./Masthead";
import { NavRibbon } from "./NavRibbon";
import { PageTurner } from "./PageTurner";
import { FrontPage }      from "@/components/sections/FrontPage";
import { AboutPage }      from "@/components/sections/AboutPage";
import { ProjectsPage }   from "@/components/sections/ProjectsPage";
import { ExperiencePage } from "@/components/sections/ExperiencePage";
import { WritingPage }    from "@/components/sections/WritingPage";
import { ContactPage }    from "@/components/sections/ContactPage";
import type { PortfolioData, PageId } from "@/types";

interface Props { data: PortfolioData }

// Map page IDs → components
const PAGE_MAP = {
  front:      FrontPage,
  about:      AboutPage,
  projects:   ProjectsPage,
  experience: ExperiencePage,
  writing:    WritingPage,
  contact:    ContactPage,
} as const;

// Inner component (needs usePage context)
function Shell({ data }: Props) {
  const { current, direction } = usePage();

  // Set direction on <html> so CSS View Transition keyframes can read it
  if (typeof document !== "undefined") {
    document.documentElement.dataset["direction"] = direction;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      <Masthead developer={data.developer} />
      <NavRibbon />

      {/* Main content + page turner */}
      <div className="flex flex-1 overflow-hidden ">
        <main className="flex-1 overflow-hidden relative">
          {/*
            React 19.2 <Activity>:
            - mode="visible"  → current page renders normally
            - mode="hidden"   → keeps the component mounted but hidden (display:none)
                                This warms up data/CSS/images for the next page
                                so when user navigates, it feels instantaneous.
            
            We pre-render the next logical page as "hidden" activity.
            The current page is always "visible".
          */}
          {PAGES.map((pageId) => {
            const Component = PAGE_MAP[pageId];
            const isActive = pageId === current;

            return (
              <Activity key={pageId} mode={isActive ? "visible" : "hidden"}>
                <div
                  className="absolute inset-0 overflow-hidden"
                  aria-hidden={!isActive}
                >
                  <Component data={data} isActive={isActive} />
                </div>
              </Activity>
            );
          })}
        </main>

        <PageTurner />
      </div>

      {/* Footer rule */}
      <footer className="px-5 py-1 border-t shrink-0" style={{ borderColor: "rgba(26,18,8,0.15)" }}>
        <p className="flex justify-between">
          <span className="caption">All Rights Reserved {new Date().getFullYear()}</span>
          <span className="caption">Built with Next.js 16 &amp; React 19.2</span>
          <span className="caption" style={{ textTransform: "uppercase", letterSpacing: "0.15em" }}>Web Edition</span>
        </p>
      </footer>
    </div>
  );
}

export function NewspaperShell({ data }: Props) {
  return (
    <PageProvider>
      <Shell data={data} />
    </PageProvider>
  );
}
