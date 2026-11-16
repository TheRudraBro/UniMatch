# UniMatch — Smart University Finder & Admission Guide

> **Find Your Perfect University.**

UniMatch helps students discover universities in Bangladesh and abroad based on
their academic qualifications, background, preferred location and budget.

This repository is being built in phases. **Phase 1 (current)** delivers the
runnable foundation and a complete, premium, responsive **homepage**.



---

## Tech stack

- **React 18** + **Vite** (JavaScript / ES6+)
- **Tailwind CSS** (class-based dark mode, CSS-variable design tokens)
- **React Router DOM** — routing
- **Framer Motion** — animations & page/section transitions
- **Lucide React** — icons
- **Recharts** — dashboard/stats charts
- **React Hook Form** — forms & validation
- **Sonner** — toast notifications
- **Context API** + **localStorage** — theme state & persistence



---

## What’s in Phase 1

- Design system: brand palette, typography (Plus Jakarta Sans / Inter), tokens,
  reusable components (`Button`, `Card`, `Badge`, inputs, `Section`, `Skeleton`…).
- **Light / Dark mode** toggle that **persists across refresh** (no flash on load).
- Responsive layout: sticky navbar with mobile drawer, footer.
- **Homepage** — hero + search, quick university search (GPA / background / budget /
  division), top universities, popular departments, international destinations,
  how-it-works, why-choose, admission-prep features, stats (counters + chart),
  sample testimonials, FAQ and newsletter CTA.
- Routing for all 16 spec pages; pages beyond Home render a branded **Coming soon**
  placeholder so **no link is a dead end**. Unknown URLs → 404.
- **Seed data:** 20 Bangladeshi private universities + 5 international universities
  (1 per country), plus a 22-item department catalog.


---

## Roadmap (later phases)

- **Phase 2** — Firebase config, authentication, protected routes.
- **Phase 3** — University & department detail pages, international finder.
- **Phase 4** — Smart matching engine (GPA + budget + background).
- **Phase 5** — Comparison, student dashboard, favorites.
- **Phase 6** — Admin dashboard & CRUD.
- **Phase 7** — Admission preparation, quizzes & mock tests.
- **Phase 8** — Firestore security rules, testing, optimization, deployment.
