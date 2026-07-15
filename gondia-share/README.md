# GondiaToday

A modern, AI-first local news portal homepage for Gondia, Maharashtra — built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Stack

- **Next.js 14** (App Router, Server Components by default)
- **TypeScript**
- **Tailwind CSS** — custom design tokens (see `tailwind.config.js`)
- **lucide-react** — icons
- **Prisma + PostgreSQL** — schema included (`prisma/schema.prisma`), not yet wired up; the app currently runs on mock data so it works out of the box
- **FastAPI / OpenAI / Gemini** — intended AI layer, called via Next.js Route Handlers (not included in this scaffold — see "Next steps")

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

No environment variables or database are required to run the homepage — it reads from `lib/api/mockData.ts` via the data-access functions in `lib/api/articles.ts`.

## Project structure

```
app/
├── layout.tsx              # Root layout: fonts, header, nav, footer
├── page.tsx                # Homepage (Server Component)
├── globals.css
├── [category]/page.tsx     # Category listing (e.g. /gondia, /sports)
├── [category]/[slug]/page.tsx  # Article detail page
└── search/page.tsx         # Search results

components/
├── layout/                 # UtilityBar, Header, NavBar, Footer
├── widgets/                 # WeatherWidget, SearchBar, NewsletterSignup
├── home/                    # Homepage sections (Hero, InShortTicker, etc.)
├── news/                    # ArticleCard, VideoCard, ArticleMeta, CategoryTag*
└── ui/                      # Button, Skeleton, CategoryTag

lib/
├── types.ts                # Article, Category, Author, etc.
├── categories.ts            # Category + nav definitions (data-driven colors)
├── utils.ts                  # cn(), formatDate()
├── prisma.ts                 # Prisma client singleton (for when DB is wired up)
└── api/
    ├── mockData.ts           # Sample Hindi news content
    └── articles.ts           # Data-access functions — swap bodies for Prisma queries

prisma/
└── schema.prisma             # Article, Category, Author, Tag, VideoStory, etc.
```

*`CategoryTag` lives in `components/ui/` since it's a generic pill primitive reused outside article contexts too.

## Design system

Defined in `tailwind.config.js`:

| Token | Value | Use |
|---|---|---|
| `brand` | `#D32F2F` | Masthead, links, primary buttons |
| `ink` | `#1A1A1A` | Headlines, body text |
| `body` | `#4A4A4A` | Secondary text |
| `surface` / `surface-muted` | `#FFFFFF` / `#F7F5F3` | Backgrounds |
| `border` | `#E8E5E1` | Dividers, card borders |

Fonts: **Poppins** (display/headlines) + **Inter** (body), both loaded via `next/font/google` with an explicit `Noto Sans Devanagari` fallback so Hindi headlines render with the same weight as the Latin type — without this fallback, Hindi text silently drops to a default system font.

## The "In Short" ticker

`components/home/InShortTicker.tsx` is the homepage's signature element — a scrolling marquee of quick bullet updates, sitting between the hero and the main grid. It mimics how Indian news readers actually skim (quick digest bullets before the full story) and is one of the few structural ideas in the brief that isn't a stock newsroom-template pattern. It respects `prefers-reduced-motion`.

## Swapping in real data (Prisma + Postgres)

1. Set `DATABASE_URL` in `.env` (see `.env.example`).
2. `npx prisma migrate dev --name init`
3. In `lib/api/articles.ts`, replace each function body with the equivalent `prisma.article.findMany(...)` call — the function signatures and return shapes are already designed to match, so no component changes are needed.

## Next steps (not included in this scaffold)

- **Auth**: wire up `/login` (NextAuth.js or Clerk recommended) for the Login/Register button.
- **FastAPI AI layer**: add `app/api/ai/summarize/route.ts` etc. as a thin proxy to your FastAPI service — keep `OPENAI_API_KEY` / `GEMINI_API_KEY` server-side only, never in client components.
- **Live weather**: `components/widgets/WeatherWidget.tsx` is currently static — wire it to a weather API with a `fetch` + `revalidate` in a small server action or route handler.
- **Real images**: replace the Unsplash placeholder URLs in `lib/api/mockData.ts` with your CMS/CDN URLs once content is live.
- **ISR tuning**: homepage uses `export const revalidate = 60` — adjust based on real traffic/editorial cadence.
