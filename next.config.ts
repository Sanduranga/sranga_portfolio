import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Next.js 16: Turbopack is now stable and default ──────────────────────────
  // No --turbopack flag needed anymore. Turbopack runs by default.

  // ── Next.js 16: "use cache" directive (Cache Components) ────────────────────
  // Replaces the old implicit fetch() caching. Fully opt-in.
  experimental: {
    // React 19.2 View Transitions — deeper Next.js integration
    viewTransition: true,

    // Next.js 16 stable: React Compiler for automatic memoization
    // Eliminates manual useMemo/useCallback across the entire app
    // reactCompiler: true,

    // Next.js 16 stable: "use cache" directive
    // Cache entire components, functions, or pages with granular TTLs
    useCache: true,

    // Turbopack file system caching — persist compile artifacts across restarts
    turbopackFileSystemCacheForDev: true,

    // DevTools MCP integration for AI-assisted debugging
    // devtoolsHost: "localhost",
  },

  // ── Logging: show full fetch URLs in dev ─────────────────────────────────────
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
