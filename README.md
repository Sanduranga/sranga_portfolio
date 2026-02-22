# Portfolio — 20th Century Broadsheet Edition

A production-ready developer portfolio built with **Next.js 16.1** and **React 19.2**, styled as a 20th-century American newspaper broadsheet. Every page transition feels like physically turning a newspaper page using the native **View Transitions API** integrated with React 19.2.

---

## Tech Stack

| Layer | Version | Feature Used |
|-------|---------|-------------|
| Next.js | 16.1 | `"use cache"` directive, `after()` API, Turbopack stable, `viewTransition` flag |
| React | 19.2 | `<Activity>`, `<ViewTransition>`, `useActionState`, `useOptimistic`, `useTransition` |
| TypeScript | 5.7 | Strict mode, `useUnknownInCatchVariables` |
| Framer Motion | 12 | Supplementary animations |
| React Hook Form | 7.54 | Client-side form validation |
| Zod | 3.24 | Schema validation (shared client + server) |
| Tailwind CSS | 3.4 | Utility styling |

---

## Next.js 16 Features Used

### `"use cache"` Directive
All data fetching functions in `src/lib/api.ts` use the `"use cache"` directive introduced in Next.js 16. This is the new opt-in caching model that replaces the confusing implicit fetch cache from Next.js 13–15.

```typescript
export async function getDeveloper(): Promise<Developer> {
  "use cache"; // Cache this function's return value
  return portfolioData.developer;
}
```

### `after()` API
Used in `src/actions/contact.ts` to run analytics/logging *after* the Server Action response is sent — without blocking the user:

```typescript
after(async () => {
  console.log(`[Contact] ${email} at ${new Date().toISOString()}`);
  // Future: Slack webhook, email queue, analytics
});
```

### Turbopack (Stable)
`next dev` and `next build` now use Turbopack by default. No `--turbopack` flag needed. Up to 10× faster Fast Refresh.

### React Compiler
Enabled in `next.config.ts` via `reactCompiler: true`. Automatically memoizes all components — no more manual `useMemo`/`useCallback`.

---

## React 19.2 Features Used

### `<Activity>` Component
In `NewspaperShell.tsx`, all pages are mounted simultaneously using `<Activity>`. The current page is `mode="visible"`, others are `mode="hidden"`. This pre-warms data, CSS, and images for the next page — making navigation feel instant.

```tsx
<Activity key={pageId} mode={isActive ? "visible" : "hidden"}>
  <Component data={data} isActive={isActive} />
</Activity>
```

### View Transitions API + `useTransition`
Navigation in `src/hooks/use-page.tsx` wraps every page change in `document.startViewTransition()`. The CSS in `globals.css` defines newspaper-style 3D page-turn keyframes for both forward and backward navigation.

```typescript
document.startViewTransition(() => {
  startTransition(() => {
    setCurrent(target); // React 19 transition
  });
});
```

### `useActionState`
The contact form uses React 19's `useActionState` for seamless Server Action integration:

```typescript
const [actionState, formAction, isPending] = useActionState(
  submitContactAction,
  initialState
);
```

### `useOptimistic`
Instant optimistic "sent" state appears immediately when the form is submitted — before the Server Action completes:

```typescript
const [optimisticSent, setOptimisticSent] = useOptimistic(
  actionState.status === "success"
);
```

---

## Getting Started

```bash
# Unzip and enter
unzip portfolio-newspaper-v3.zip && cd portfolio-newspaper

# Install
npm install

# Development (Turbopack runs automatically)
npm run dev

# Type check
npm run type-check

# Production build
npm run build && npm start
```

Visit `http://localhost:3000`

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout + SEO metadata
│   ├── page.tsx            ← Async Server Component (data fetching entry)
│   ├── globals.css         ← All styles including View Transition keyframes
│   ├── sitemap.ts
│   └── robots.ts
├── actions/
│   └── contact.ts          ← React 19 Server Actions + after() API
├── components/
│   ├── layout/
│   │   ├── NewspaperShell.tsx  ← React 19.2 <Activity> page management
│   │   ├── Masthead.tsx        ← Broadsheet header (view-transition-name)
│   │   ├── NavRibbon.tsx       ← Section navigation tabs
│   │   └── PageTurner.tsx      ← Right-side prev/next navigator
│   └── sections/
│       ├── FrontPage.tsx       ← Editorial front page layout
│       ├── AboutPage.tsx       ← Bio + animated skill bars
│       ├── ProjectsPage.tsx    ← Master/detail project browser
│       ├── ExperiencePage.tsx  ← Career timeline
│       ├── WritingPage.tsx     ← Articles with preview panel
│       └── ContactPage.tsx     ← useActionState + useOptimistic form
├── data/
│   └── portfolio.ts        ← Mock data (mirrors CMS API shape)
├── hooks/
│   └── use-page.tsx        ← Navigation context + View Transition integration
├── lib/
│   ├── api.ts              ← "use cache" data fetchers
│   ├── schemas.ts          ← Zod schemas (shared client + server)
│   └── utils.ts
└── types/
    └── index.ts            ← All TypeScript interfaces
```

---

## CMS Integration

Set `NEXT_PUBLIC_API_URL` in `.env.local` and all data functions automatically switch to real API calls. Expected endpoints:

```
GET  /api/developer
GET  /api/projects
GET  /api/skills
GET  /api/experience
GET  /api/articles
POST /api/contact
```

**Response envelope:**
```json
{ "data": <T>, "status": "success", "timestamp": "ISO-8601" }
```

To bust the cache after a CMS update, call the `revalidatePortfolio(tag)` Server Action from your webhook handler.

---

## Design

The aesthetic is a 20th-century American broadsheet:
- **Playfair Display** — headlines (bold, uppercase, tight)
- **IM Fell English** — body copy (old-style serif, italic rhythm)
- **Libre Baskerville** — deck text (editorial italic)
- **Special Elite** — captions and metadata (typewriter)
- **Josefin Sans** — labels and bylines (geometric, uppercase)
- Colour palette: aged newsprint (`#f2ead8`), deep ink (`#1a1208`), muted ochre rules
- Background: CSS layered gradients simulating newsprint texture and scan lines — no image files needed
- Page transitions: native browser View Transitions API with 3D perspective `rotateY` for a genuine page-turn feel

---

## Deployment

Works on any Next.js-compatible host. Recommended: **Vercel**.

```bash
npm run build
# Deploy /portfolio directory
```

Node.js 20.9+ required (Next.js 16 minimum).
