# معمل الشروق بهناي - Al-Shorouk Bihnay Lab

موقع إلكتروني احترافي لمعمل الشروق بهناي - معمل تحاليل طبية معتمد في بهناي، المنوفية.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router, SSR)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Shadcn UI Components
- **Animations:** Framer Motion
- **Database:** PostgreSQL + Prisma ORM
- **i18n:** Custom i18n with Arabic RTL default
- **SEO:** Full SSR + Schema.org JSON-LD + sitemap + robots.txt

## 🎨 Design System

- **Primary:** Medical Blue `#0077B6`
- **Secondary:** Soft Teal `#00B4D8`
- **Background:** Clean White + light slate
- **Vibe:** Professional, trustworthy, calming

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Setup database (PostgreSQL)
cp .env.example .env
# Update DATABASE_URL in .env

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with JSON-LD
│   ├── page.tsx            # Landing page (SEO-optimized)
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # robots.txt
│   └── globals.css
├── components/
│   ├── layout/             # Navbar, Footer, Logo
│   ├── landing/            # Hero, QuickActions, SearchBar, etc.
│   └── ui/                 # Reusable Shadcn components
├── lib/
│   ├── config.ts           # Site configuration
│   ├── seo.ts              # Schema.org generators
│   └── utils.ts            # Utilities
public/
└── locales/
    ├── ar/common.json
    └── en/common.json
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Initial data
```

## ✅ Completed (Phase 1)

- [x] Next.js project structure with SSR
- [x] Prisma schema (Tests, Categories, HomeVisitRequest, Branch, etc.)
- [x] Theme system (Medical Blue + Teal)
- [x] Logo (SVG with sunrise + medical plus)
- [x] Navbar (responsive, mobile menu)
- [x] Footer (with contact info)
- [x] Schema.org JSON-LD (MedicalLaboratory)
- [x] sitemap.xml + robots.txt
- [x] Landing page (Hero + Search + QuickActions + About + Accreditations)
- [x] Multi-language setup (AR/EN)

## 📋 Next Phases (Pending Approval)

- [ ] Tests Directory (searchable grid)
- [ ] Multi-step Home Visit Form
- [ ] Results Tracking page
- [ ] Admin Dashboard
- [ ] Branches page
- [ ] About page

## 🔍 SEO Features

- Server-Side Rendering (Next.js App Router)
- Semantic HTML (proper h1, h2, h3 hierarchy)
- Schema.org structured data (MedicalLaboratory, LocalBusiness, WebSite)
- Dynamic sitemap.xml
- robots.txt
- Optimized meta tags (Arabic + English)
- Open Graph + Twitter Card
- Preconnect to fonts (faster LCP)
- Responsive images
