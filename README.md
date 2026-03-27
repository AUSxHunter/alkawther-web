# Al Kawther — Construction Materials Web Platform

B2B catalog and quote request website for **Al Kawther Construction Materials**, a premium construction materials supplier based in Sharjah, UAE.

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** — quote cart state (persisted to localStorage)
- **React Hook Form + Zod** — form validation
- **Nodemailer** — quote email delivery
- **Lucide React** — icons

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional — if not set, emails log to console instead of sending
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

## Project Structure

```
app/                        # Next.js App Router pages & API routes
components/
  ├── home/                 # Homepage section components
  ├── layout/               # Header, Footer, StickyMobileActions
  ├── navigation/           # MegaMenu
  ├── products/             # Category & product display
  ├── quote/                # Cart drawer, quote form, success screen
  └── ui/                   # Reusable primitives (Button, Badge, etc.)
data/
  ├── categories.ts         # 14 product categories
  ├── products/             # Product data per category
  ├── brands.ts
  ├── company.ts
  └── faq.ts
store/quote-cart.ts         # Zustand quote cart
lib/                        # Utilities, email, validators
public/images/              # Static assets (hero, categories, brands)
```

---

## Product Catalog

14 categories including Steel & Metal, Wood & Plywood, Cement & Concrete, Electrical, Waterproofing, Power Tools, and more. Each category supports either a **table view** or **card view**, configured per category in `data/categories.ts`.

---

## Quote Request Flow

1. User browses catalog and adds items to the quote cart
2. Cart persists in `localStorage` across sessions
3. User submits contact details via `/request-quote`
4. Server validates and sends a formatted email via SMTP
5. User receives a confirmation with a reference ID

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Company Info

**Al Kawther Construction Materials**
Sharjah, UAE — Industrial Area
📞 +971 55 707 1393 | ✉️ ahmedtaad03@gmail.com
