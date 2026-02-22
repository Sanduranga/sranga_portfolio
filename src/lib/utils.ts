import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getEditionNumber(): string {
  const start = new Date("2018-06-01").getTime();
  const now = Date.now();
  const weeks = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7));
  return String(weeks).padStart(4, "0");
}

export function getTodayFormatted(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const skillWidth: Record<string, string> = {
  expert: "90%",
  proficient: "62%",
  familiar: "36%",
};

export const skillLabel: Record<string, string> = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
};
