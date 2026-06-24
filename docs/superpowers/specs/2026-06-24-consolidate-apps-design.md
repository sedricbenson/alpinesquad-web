# Consolidate Bible Blitz + Spelly onto one domain — design

_2026-06-24_

## Goal

Finish the marketing-page **content** for both apps on a single domain
(`alpinesquad.com`), so the user can review the rendered pages before we connect
the domain. Domain/DNS connection is explicitly out of scope for this pass.

## Background (current state)

Two separate, already-built, already-deployed sites:

- **alpinesquad-web** (this repo, Astro): umbrella `/` + `/bibleblitz`. Live at
  `alpinesquad-web.vercel.app`. Only lists Bible Blitz.
- **spelling-game/web** (separate repo, static HTML): 5 pages targeting Spelly
  keywords. Live at `spelly.vercel.app`. Targets subdomain `spelly.alpinesquad.com`.

Neither custom domain was ever connected — both `alpinesquad.com` and
`spelly.alpinesquad.com` still point at Hover's parking IP. The real domain has
**zero indexed URLs**, so slugs can be chosen freely now at no SEO cost.

## Decision

Consolidate everything into this Astro repo under `alpinesquad.com/<app>/…`
subdirectories (better than a subdomain for funneling all link authority into one
domain). Retire the standalone `spelling-game/web` site (its Vercel project gets
unhooked during the later domain step).

## Routes (final)

| Route | Origin | Action |
|---|---|---|
| `/` | exists | Add a **Spelly** card alongside Bible Blitz |
| `/bible-blitz` | exists as `/bibleblitz` | Rename folder; add `301` redirect from `/bibleblitz` |
| `/spelly` | port `web/index.html` | Main Spelly landing; fold FAQ inline (FAQPage schema) |
| `/spelly/learn-english` | port `web/learn-english.html` | ESL/ELL keyword page |
| `/spelly/spelling-for-kids` | port `web/spelling-for-kids.html` | Parents/kids keyword page |
| `/spelly/spelling-bee` | port `web/spelling-bee.html` | Bee-prep keyword page |

Standalone `web/faq.html` content is folded into `/spelly` (avoids a thin page).

## Design / components

- All pages use the existing `BaseLayout.astro` + Alpine Squad design tokens, so
  the domain reads as one product family.
- Shared chrome (nav, footer, premium dark hero, serif headings) matches the
  Bible Blitz page. **Spelly gets its own accent color** so it reads as a distinct
  product, not a Bible-Blitz clone. Accent finalized during visual review.
- Text-first, minimal screenshots — matches the indie aesthetic already chosen
  (Spelly commit "drop screenshots, match indie aesthetic"). The 3 existing Spelly
  screenshots (`word-blitz`, `picture-spell`, `categories`) are available if used.
- A small reusable `AppStoreButton` is extracted if the App Store CTA markup is
  duplicated across the new pages (DRY the SVG + label).

## Content sources (Spelly facts to preserve)

- Two modes: **Picture Spell** (learn by sight) + **Word Blitz** (race the clock).
- Thousands of words, **23 categories**, daily streaks, 3 difficulty tiers
  (incl. SAT-grade hard). Free, no ads, no accounts, offline, word-safety reviewed.
- Has a paid tier ("Spelly Pro"). App Store id `6757465281`.
- Bible Blitz: App Store id `6771674002` (existing page already complete).

## SEO

- Per-page `<title>`, meta description, canonical (port the existing well-written
  ones). `MobileApplication` JSON-LD per app; `FAQPage` JSON-LD where FAQs exist.
- Sitemap auto-regenerates (`@astrojs/sitemap`). Cross-link both apps from `/`.
- Apple Smart App Banner per app (`apple-itunes-app` app-id must be **per page**,
  not hardcoded in `BaseLayout` — currently fixed to Bible Blitz's id).

## Portability (future-proofing)

- Drive canonical/OG/schema base URL from `Astro.site` (one config value), not
  hardcoded `alpinesquad.com` strings, so a future move = one-line change.
- Keep Spelly content self-contained under `/spelly/*` + namespaced assets
  (`/images/spelly-*`) so the app can be lifted to its own domain cleanly later.

## Out of scope

- Connecting `alpinesquad.com` / DNS (done together after page approval).
- Any change to the iOS apps.
- Retiring the `spelling-game/web` repo (happens during the domain step).

## Verification / review gate

Build succeeds (`npm run build`), `npm run dev` serves every route, then the user
reviews the rendered pages + screenshots before anything ships.
