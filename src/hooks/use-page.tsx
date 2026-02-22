"use client";

import {
  createContext,
  useContext,
  useState,
  useTransition,
  useCallback,
  startTransition,
  type ReactNode,
} from "react";
import type { PageId } from "@/types";

export const PAGES: PageId[] = [
  "front",
  "about",
  "projects",
  "experience",
  "writing",
  "contact",
];

export const PAGE_LABELS: Record<PageId, string> = {
  front: "Front Page",
  about: "About",
  projects: "Works",
  experience: "Record",
  writing: "Writing",
  contact: "Dispatch",
};

export const PAGE_NUMBERS: Record<PageId, string> = {
  front: "I",
  about: "II",
  projects: "III",
  experience: "IV",
  writing: "V",
  contact: "VI",
};

interface PageCtx {
  current: PageId;
  previous: PageId | null;
  direction: "forward" | "backward";
  isPending: boolean;
  go: (id: PageId) => void;
  goNext: () => void;
  goPrev: () => void;
}

const Ctx = createContext<PageCtx>({
  current: "front",
  previous: null,
  direction: "forward",
  isPending: false,
  go: () => {},
  goNext: () => {},
  goPrev: () => {},
});

export function PageProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PageId>("front");
  const [previous, setPrevious] = useState<PageId | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isPending, startPageTransition] = useTransition();

  const navigate = useCallback(
    (target: PageId) => {
      if (target === current) return;
      const curIdx = PAGES.indexOf(current);
      const tgtIdx = PAGES.indexOf(target);
      const dir = tgtIdx > curIdx ? "forward" : "backward";

      // React 19.2: wrap in startTransition so React marks this as non-urgent
      // Combined with View Transitions API for native browser animation
      const doTransition = () => {
        startPageTransition(() => {
          setDirection(dir);
          setPrevious(current);
          setCurrent(target);
        });
      };

      // Use native View Transition API if available (Chrome 111+)
      if (typeof document !== "undefined" && "startViewTransition" in document) {
        (document as Document & { startViewTransition: (fn: () => void) => unknown }).startViewTransition(doTransition);
      } else {
        doTransition();
      }
    },
    [current]
  );

  const goNext = useCallback(() => {
    const idx = PAGES.indexOf(current);
    if (idx < PAGES.length - 1) navigate(PAGES[idx + 1]!);
  }, [current, navigate]);

  const goPrev = useCallback(() => {
    const idx = PAGES.indexOf(current);
    if (idx > 0) navigate(PAGES[idx - 1]!);
  }, [current, navigate]);

  return (
    <Ctx.Provider value={{ current, previous, direction, isPending, go: navigate, goNext, goPrev }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePage() {
  return useContext(Ctx);
}
