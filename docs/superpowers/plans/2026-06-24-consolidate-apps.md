# Consolidate Bible Blitz + Spelly onto one domain — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring Spelly's 4 marketing pages into the Astro umbrella site under `/spelly/*`, add Spelly to the landing page, and normalize Bible Blitz to `/bible-blitz` — so both apps live on one domain, ready for visual review before the domain is connected.

**Architecture:** Astro static site. A new `SpellyLayout.astro` wraps the shared `BaseLayout` and supplies Spelly's purple palette + shared nav/footer + section component styles, so each Spelly page is just SEO frontmatter + content. A reusable `AppStoreButton.astro` DRYs the App Store CTA across all pages. Content (copy, stats, FAQ) ports **verbatim** from `spelling-game/web/*.html`.

**Tech Stack:** Astro 5, `@astrojs/sitemap`, static HTML/CSS (zero client JS by default), Vercel.

## Global Constraints

- Output stays `output: 'static'`; zero added runtime JS. (`astro.config.mjs`)
- Base URL for canonical/OG/schema derives from `Astro.site` — never hardcode `https://alpinesquad.com`. (`BaseLayout.astro` already does this for canonical/OG; schema objects must too.)
- Spelly App Store id: `6757465281`. Bible Blitz App Store id: `6771674002`.
- Spelly facts (verbatim from source): **14,000+ hand-curated words**, **23 categories**, **2 game modes** (Picture Spell, Word Blitz), 3 difficulty tiers (Easy 6–10 / Medium 11–15 / Hard 16+ SAT-grade), free with optional **Spelly Pro** one-time IAP, no ads/accounts/trackers, offline, iPhone+iPad iOS 17+.
- Spelly accent palette (from source `theme-color`): indigo `#6c5bcb`. Bible Blitz keeps the green Alpine Squad accent.
- Disclosures live at `https://sedricbenson.github.io/disclosures/{spelly,bibleblitz}/{privacy,terms}.html`.
- Contact: Spelly `spellyapphelp@gmail.com`; Alpine Squad `hello@alpinesquad.com`.
- Commit style: conventional commits; branch already `sedric/feat-consolidate-spelly-bibleblitz`. Do not push (user reviews first).

## File Structure

| File | Responsibility |
|---|---|
| `src/components/AppStoreButton.astro` | NEW — reusable App Store badge (SVG + label), `variant` prop (`dark`/`light`) |
| `src/layouts/BaseLayout.astro` | MODIFY — add `appId` prop driving `apple-itunes-app` (stop hardcoding BB id); ensure OG default exists |
| `src/layouts/SpellyLayout.astro` | NEW — Spelly palette + shared nav/footer + section styles; wraps BaseLayout |
| `src/pages/index.astro` | MODIFY — add Spelly card; point BB card to `/bible-blitz` |
| `src/pages/bible-blitz/index.astro` | MOVE from `bibleblitz/` — pass `appId`; fix footer privacy/terms links |
| `src/pages/spelly/index.astro` | NEW — main landing + inline FAQ (MobileApplication + FAQPage JSON-LD) |
| `src/pages/spelly/learn-english.astro` | NEW — ESL landing |
| `src/pages/spelly/spelling-for-kids.astro` | NEW — kids landing |
| `src/pages/spelly/spelling-bee.astro` | NEW — bee-prep landing |
| `public/images/spelly-icon.png`, `spelly-og.png`, `spelly-word-blitz.png`, `spelly-picture-spell.png`, `spelly-categories.png` | NEW — copied from `spelling-game/web/` |
| `vercel.json` | MODIFY — `/bibleblitz`→`/bible-blitz` redirect; `/{bible-blitz,spelly}/{privacy,terms}` → disclosures |

**Note on verification:** This is a static-content port with no unit-test surface. Each task's gate is `npm run build` succeeding + the affected route(s) rendering correctly in `npm run dev`. That replaces the usual failing-test step.

---

### Task 1: Reusable App Store button + per-page app banner

**Files:**
- Create: `src/components/AppStoreButton.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `AppStoreButton` — props `{ href: string; variant?: 'dark' | 'light' }`. Renders an `<a class="appstore-btn">` with the Apple SVG + "Download on the / App Store".
- Produces: `BaseLayout` gains prop `appId?: string`. When set, renders `<meta name="apple-itunes-app" content={`app-id=${appId}`} />`. When unset, omit the tag.

- [ ] **Step 1: Create `AppStoreButton.astro`** with the badge markup (Apple logo path `M17.05 12.04c0-2.05…` reused from current BB page), `variant` controlling background (`dark` = black, `light` = `--ink`). Scoped `<style>` ports `.appstore-btn`/`.appstore-btn-light` rules from `src/pages/bibleblitz/index.astro:329-349`.

- [ ] **Step 2: Edit `BaseLayout.astro`** — add `appId?: string` to `Props` and destructure; replace the hardcoded `<meta name="apple-itunes-app" content="app-id=6771674002" />` (line 51) with `{appId && <meta name="apple-itunes-app" content={`app-id=${appId}`} />}`.

- [ ] **Step 3: Fix OG default** — `ogImage` defaults to `/og-default.png` which does not exist. Change default to `/images/bibleblitz-og.png`'s neutral sibling: create `public/og-default.png` by copying an existing OG asset, OR change default to `undefined` and only emit OG image tags when provided. Choose: copy `public/images/bibleblitz-og.png` → `public/og-default.png` so `/` has a valid card.

- [ ] **Step 4: Build** — `npm run build`. Expected: success, no missing-asset warnings for `/`.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "refactor: extract AppStoreButton, make app banner per-page"`

---

### Task 2: SpellyLayout (palette + chrome + section styles) + assets

**Files:**
- Create: `src/layouts/SpellyLayout.astro`
- Create: `public/images/spelly-*.png` (copied assets)

**Interfaces:**
- Consumes: `AppStoreButton` (Task 1), `BaseLayout` (Task 1, with `appId`).
- Produces: `SpellyLayout` — props `{ title; description; ogImage?; canonical?; schema? }`. Hardcodes `appId="6757465281"` into BaseLayout. Renders shared Spelly `<header>` nav (brand → `/spelly`, links → `/spelly/learn-english`, `/spelly/spelling-for-kids`, `/`) and `<footer>` (Home, English Learners, Kids, Spelling Bee, FAQ→`/spelly#faq`, Privacy→`/spelly/privacy`, Terms→`/spelly/terms`). `<slot />` for page body.
- Produces shared CSS classes for pages to use: `.s-hero`, `.s-lede`, `.s-eyebrow`, `.s-section`, `.s-section-alt`, `.s-h2`, `.s-section-lede`, `.s-feature-grid`, `.s-feature`, `.s-modes-grid`, `.s-mode-card` (+`.s-mode-a`/`.s-mode-b` accents), `.s-audience-row`, `.s-chip`, `.s-stat-strip`, `.s-stat`, `.s-trust-row`, `.s-trust-chip`, `.s-final-cta`, `.s-faq-item`.

- [ ] **Step 1: Copy assets**
```bash
cd /Users/sedric/git/personal/alpinesquad-web
cp ../spelling-game/web/icon.png public/images/spelly-icon.png
cp ../spelling-game/web/og-image.png public/images/spelly-og.png
cp ../spelling-game/web/screenshots/word-blitz.png public/images/spelly-word-blitz.png
cp ../spelling-game/web/screenshots/picture-spell.png public/images/spelly-picture-spell.png
cp ../spelling-game/web/screenshots/categories.png public/images/spelly-categories.png
```

- [ ] **Step 2: Create `SpellyLayout.astro`.** Frontmatter wraps `BaseLayout` with `appId="6757465281"` and a Spelly-scoped palette. Define palette as local CSS vars on a `.spelly` wrapper div that contains nav/slot/footer:
```
.spelly { --s-accent:#6c5bcb; --s-accent-soft:#8b7be0; --s-accent-deep:#4a3fb0; }
```
Port and restyle the section component CSS (from `spelling-game/web/style.css`) under `.spelly` selectors, matching Alpine Squad aesthetic (serif headings via `--serif`, `--bg`/`--bg-deep` backgrounds, dark hero like BB but using `--s-accent` for the glow/accents). Nav is sticky translucent (mirror BB `.nav` at `src/pages/bibleblitz/index.astro:228-262`). Use `<AppStoreButton>` is NOT in the layout (pages place CTAs); layout provides only chrome + styles.

- [ ] **Step 3: Build** — `npm run build`. Expected: success (layout unused yet → no route, but must compile; add a temporary throwaway import check by building after Task 3 if needed).

- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: SpellyLayout — palette, chrome, shared section styles + assets"`

---

### Task 3: `/spelly` main landing page (+ inline FAQ)

**Files:**
- Create: `src/pages/spelly/index.astro`

**Interfaces:**
- Consumes: `SpellyLayout` (Task 2), `AppStoreButton` (Task 1).

SEO frontmatter (verbatim from `spelling-game/web/index.html`):
- title: `Spelly — Learn English Spelling | Free Spelling Games for Kids, Families & English Learners`
- description: `Two spelling games in one. Picture Spell to learn by sight, Word Blitz to race the clock. Thousands of words, 23 categories, daily streaks. Free on the App Store — built for kids, families, and English learners.`
- ogImage: `/images/spelly-og.png`
- schema: `@graph` with `MobileApplication` (name Spelly, EducationApplication, iOS, offers price 0 USD, publisher Alpine Squad, url `https://apps.apple.com/app/id6757465281`) **+** `FAQPage` built from the 12 Q/A in `spelling-game/web/faq.html:29-126` (port verbatim).

Body sections (port copy verbatim from `web/index.html`):
- [ ] **Step 1: Hero** — h1 "Learn English spelling, the fun way.", lede (line 73), `<AppStoreButton href="https://apps.apple.com/app/id6757465281" />`, trust chips (Free forever / No ads / Private by design / Daily streaks), stat strip (14,000+ words · 23 categories · 2 modes · 0 ads/accounts/trackers).
- [ ] **Step 2: "Two ways to play"** — modes grid: Picture Spell (`.s-mode-a`) + Word Blitz (`.s-mode-b`), copy from lines 124-141.
- [ ] **Step 3: "Built for every learner"** (`.s-section-alt`) — audience chips (Kids 6+, Families, ESL students, IELTS/TOEFL prep, SAT vocabulary, Homeschool), lede line 148.
- [ ] **Step 4: "Why it works"** — feature grid, 6 features from lines 164-207 (Thousands of words / Daily streaks / Smart review / No ads, no trackers / Light & dark / Family-friendly).
- [ ] **Step 5: FAQ** — `<section id="faq">` with 12 `<details class="s-faq-item">` from `web/faq.html` (the inline-folded FAQ). Match BB FAQ disclosure styling.
- [ ] **Step 6: Final CTA** — "Spell smarter. Today." + AppStoreButton.
- [ ] **Step 7: Build + render** — `npm run build`; `npm run dev`; load `/spelly`. Expected: page renders, FAQ toggles, JSON-LD valid.
- [ ] **Step 8: Commit** — `git add -A && git commit -m "feat: /spelly main landing with inline FAQ"`

---

### Task 4: Three Spelly keyword landing pages

**Files:**
- Create: `src/pages/spelly/learn-english.astro`
- Create: `src/pages/spelly/spelling-for-kids.astro`
- Create: `src/pages/spelly/spelling-bee.astro`

**Interfaces:** Consumes `SpellyLayout` + `AppStoreButton`. Each ports SEO + body verbatim from the matching `web/*.html`.

- [ ] **Step 1: `learn-english.astro`** — title/desc/canonical from `web/learn-english.html:7-9`; sections: hero ("Learn English spelling by sight."), "Why visual spelling works" (3 features, lines 60-82), "Built for English learners" audience chips (`.s-section-alt`), final CTA "Free. No ads. No accounts."
- [ ] **Step 2: `spelling-for-kids.astro`** — title/desc from `web/spelling-for-kids.html:7-8`; sections: hero ("Spelling games kids actually want to play."), "What parents love" (6 features, lines 60-101), "Two modes, one app" (`.s-section-alt`, modes grid), final CTA "Free. Forever."
- [ ] **Step 3: `spelling-bee.astro`** — title/desc from `web/spelling-bee.html:7-8`; sections: hero ("Train for the spelling bee."), "Why Spelly for bee prep" (6 features, lines 58-101), final CTA "Ready to compete?"
- [ ] **Step 4: Build + render** — `npm run build`; load all three routes in `npm run dev`. Expected: render correctly, internal nav links resolve.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: Spelly keyword landing pages (ESL, kids, spelling bee)"`

---

### Task 5: Umbrella landing + Bible Blitz rename + redirects

**Files:**
- Modify: `src/pages/index.astro`
- Move: `src/pages/bibleblitz/` → `src/pages/bible-blitz/`
- Modify: `src/pages/bible-blitz/index.astro`
- Modify: `vercel.json`

- [ ] **Step 1: Add Spelly to `index.astro` `apps` array** (after the Bible Blitz entry):
```js
{
  name: 'Spelly',
  tagline: 'Two spelling games in one.',
  description: 'Picture Spell to learn by sight, Word Blitz to race the clock. 14,000+ words across 23 categories. Free, no ads, no accounts.',
  icon: '🐝',
  href: '/spelly',
  appStore: 'https://apps.apple.com/app/id6757465281',
  status: 'live',
},
```
Change the Bible Blitz `href` from `/bibleblitz` to `/bible-blitz`.

- [ ] **Step 2: Rename BB folder** — `git mv src/pages/bibleblitz src/pages/bible-blitz`.

- [ ] **Step 3: Edit `bible-blitz/index.astro`** — pass `appId="6771674002"` to `<BaseLayout>` (now that BaseLayout no longer hardcodes it); fix footer links: `/bibleblitz/privacy`→`/bible-blitz/privacy`, `/terms`→`/bible-blitz/terms`. Optionally swap the inline App Store CTAs for `<AppStoreButton>` (DRY) — keep visual output identical.

- [ ] **Step 4: Edit `vercel.json`** — replace the two `/bibleblitz/{privacy,terms}` redirects with `/bible-blitz/{privacy,terms}` → the same GitHub Pages disclosure URLs; add `/spelly/privacy` and `/spelly/terms` → `https://sedricbenson.github.io/disclosures/spelly/{privacy,terms}.html`; add a permanent redirect `/bibleblitz` → `/bible-blitz` (and `/bibleblitz/:path*` → `/bible-blitz/:path*`).

- [ ] **Step 5: Build + render** — `npm run build`; in `npm run dev` verify `/` shows both cards, `/bible-blitz` renders, sitemap lists all routes.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: list Spelly on landing; normalize Bible Blitz to /bible-blitz + redirects"`

---

### Task 6: Final build, preview, screenshots for review

- [ ] **Step 1: Clean build** — `npm run build`. Expected: success; `dist/` contains `index.html`, `bible-blitz/`, `spelly/`, `spelly/learn-english`, `spelly/spelling-for-kids`, `spelly/spelling-bee`, updated `sitemap-0.xml`.
- [ ] **Step 2: Start preview** — `npm run preview` (or `dev`); capture the local URL.
- [ ] **Step 3: Screenshot each route** for the user: `/`, `/bible-blitz`, `/spelly`, `/spelly/learn-english`, `/spelly/spelling-for-kids`, `/spelly/spelling-bee` (light + dark where relevant).
- [ ] **Step 4: Present** local URL + screenshots; hold for user approval before any push or domain work.

## Self-Review

**Spec coverage:** routes (T3,T4,T5) ✓; consolidation under `/spelly/*` (T2-T4) ✓; Spelly card on `/` (T5) ✓; BB rename + redirects (T5) ✓; per-app accent (T2) ✓; per-app Apple banner (T1) ✓; MobileApplication + FAQPage schema (T3) ✓; `Astro.site`-driven base URL (T1 constraint) ✓; namespaced assets (T2) ✓; FAQ folded inline (T3) ✓; review gate (T6) ✓. No gaps.

**Placeholder scan:** none — copy sources cited by file+line; SEO strings inline verbatim.

**Type consistency:** `AppStoreButton {href,variant}`, `BaseLayout.appId`, `SpellyLayout {title,description,ogImage,canonical,schema}` used consistently across T2–T5. Shared `.s-*` class names defined in T2, consumed in T3/T4.
