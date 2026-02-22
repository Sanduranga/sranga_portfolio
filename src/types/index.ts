// ─── Portfolio Types (CMS-ready) ──────────────────────────────────────────────

export interface Developer {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  availability: "available" | "busy" | "unavailable";
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  longDescription: string;
  tech: string[];
  role: string;
  year: number;
  status: "live" | "archived" | "wip";
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  category: "web" | "mobile" | "api" | "tool" | "other";
  impact?: string;
}

export interface Skill {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: "expert" | "proficient" | "familiar";
  yearsExp?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  tech: string[];
  location: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  url?: string;
}

export interface PortfolioData {
  developer: Developer;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  articles: Article[];
}

// ─── API Envelope ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
  timestamp: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

// React 19 useActionState shape
export interface ActionState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export type PageId =
  | "front"
  | "about"
  | "projects"
  | "experience"
  | "writing"
  | "contact";
