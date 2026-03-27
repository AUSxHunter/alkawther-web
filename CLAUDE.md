# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint via next lint
```

There is no test suite configured in this project.

---

## Architecture

This is a **Next.js 14 App Router** B2B catalog site for Al Kawther Construction Materials (UAE). There is **no e-commerce checkout** — the purchase flow is entirely a **quote request system**.

### Data Flow: Static Catalog → Quote Cart → Email

All product and category data lives in `data/` as plain TypeScript arrays — there is no database or external API. Pages are statically generated at build time.

```
data/categories.ts          → defines 14 categories (slug, displayMode, tableColumns)
data/products/{slug}.ts     → defines products + variants per category
data/products/index.ts      → exports getProductsByCategory(), getProductGroups()
```

When a user adds a product to their quote, it goes into a **Zustand store** (`store/quote-cart.ts`) persisted to `localStorage` under the key `alkawther-quote-cart`. The cart drawer (`QuoteCartDrawer`) slides in from the right. Submitting the quote POSTs to `/api/quote/route.ts`, which validates with Zod, formats an HTML email via `lib/quote-formatter.ts`, and sends it via Nodemailer.

### Category Display Modes

Each category in `data/categories.ts` has a `displayMode` of either `"table"` or `"cards"`. The `[categorySlug]/page.tsx` switches between `<ProductTable>` and `<ProductCardList>` based on this value. Table categories also define `tableColumns` to control which columns render (and which are hidden on mobile via `hideOnMobile: true`).

Products within a category can have a `group` field — if multiple groups exist, they render as separate labelled sections.

### Routing

| Route | Notes |
|---|---|
| `/` | All homepage sections as sequential components |
| `/products` | Grid of all 14 categories |
| `/products/[categorySlug]` | Statically generated via `generateStaticParams()` from `data/categories.ts` |
| `/request-quote` | Full quote form (`RequestQuoteClient.tsx` is the client component) |
| `/api/quote` | POST — validates → formats → sends email |

### Key Conventions

- **Class merging:** always use `cn()` from `lib/utils.ts` (wraps `clsx` + `tailwind-merge`)
- **Sections:** use `py-section` (5rem) or `py-section-sm` (3rem) for vertical rhythm
- **Content width:** wrap in `<Container>` from `components/ui/`
- **Headings:** use `<SectionHeading>` for eyebrow + title + subtitle patterns
- **Colors:** gold (`#C8A96E`), charcoal (`#2A2825`), cream (`#F5F2EE`) — all available as Tailwind tokens
- **Fonts:** `font-display` (Cormorant Garamond, serif) for headings, `font-sans` (Manrope) for body

### Hero Section (responsive backgrounds)

`HeroSection.tsx` uses **two separate background divs**, not a single `<img>`:
- `hidden sm:block` → `hero-bg.jpeg` (desktop/tablet)
- `block sm:hidden` → `hero-bg-mobile.jpeg` (mobile)

Both use `bg-hero-overlay` + `backgroundBlendMode: "overlay"` for the dark tint. The bottom white fade gradient was intentionally removed.

### Adding a New Category or Product

1. Add the category object to `data/categories.ts` with a unique `slug`, `displayMode`, and `tableColumns` if table mode.
2. Create `data/products/{slug}.ts` exporting a `Product[]` array.
3. Register the import in `data/products/index.ts`.
4. Drop a hero image at `public/images/categories/{slug}.jpg`.

The category page and navigation (MegaMenu) will pick it up automatically.

### Environment Variables

```
NEXT_PUBLIC_SITE_URL=   # used for metadata canonical URLs
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

If SMTP vars are absent, email sending falls back to a stub (logs to console) — the site works without them in development.

