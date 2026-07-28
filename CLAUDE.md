# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (flat config, `eslint-config-next/core-web-vitals`)

There is no test suite configured in this repo.

## Architecture

This is a single-page Next.js (App Router) marketing site for "Le Burst," an AI-adoption workshop offered by innovation.expert. It is deliberately a one-pager, not a multi-route app.

- `app/layout.js` — root layout, loads the Montserrat font and sets page metadata (title/description are in French; this is the primary marketing language).
- `app/page.js` — the entire site. A single `'use client'` component (~780 lines) containing:
  - `HERO_IMAGES`: the hero image carousel data (files in `public/hero/`).
  - `C`: a bilingual (`fr`/`en`) copy dictionary — all page text lives here, keyed by section (`nav`, `hero`, `problem`, `what`, `deroule`, `formules`, `proof`, `testimonial`, etc.). When editing copy, edit this object rather than JSX strings.
  - `Home()`: the page component, which reads `lang` state (default `'fr'`) to pick strings out of `C`, and renders each section (`#burst`, `#deroule`, `#formules`, `#pour-qui`, `#inscription`) in order. It also drives the hero carousel (`slide` state) and a multi-step qualification form (`enjeu`, `formule`, `outils`, `delai`, `submitted` state).
  - `app/globals.css` — Tailwind v4 (via `@tailwindcss/postcss`) entry point.
- Brand palette (also noted inline in `page.js`): navy `#004764`, blue `#008cc1` (hover `#00648C`), green `#238251` (hover `#1a6b3a`), teal `#0BB89B`, light `#F2F1F0`. Reuse these hex values for consistency rather than introducing new colors.
- `photos/` holds raw/unprocessed source photos and is excluded from Vercel deploys via `.vercelignore`; only images actually referenced by the app should live under `public/`.
- Path alias `@/*` maps to the repo root (see `jsconfig.json`).

## Content notes

- The site is bilingual FR/EN via client-side state, not routing — there are no `/en` or `/fr` URLs. Any new section must add entries to both the `fr` and `en` branches of `C`.
- Some content (e.g. the Croesus testimonial, pricing figures) is explicitly marked as draft/pending confirmation in the copy itself (`draftTag`, "à valider", "indicatif"). Check for such markers before treating copy as final.
