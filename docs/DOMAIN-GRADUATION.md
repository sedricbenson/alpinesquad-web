# Domain graduation — when an app leaves alpinesquad.com

Every app lives at `alpinesquad.com/<app>/…` by default so all SEO authority
compounds into one domain. An app "graduates" to its own domain only when it
has earned dedicated investment. This doc is the trigger checklist and the
migration playbook. (Decided 2026-06; context: apps under subfolders beat
subdomains/separate sites while domain authority is young.)

## Graduation triggers

Graduate an app when **at least two** of these hold for **3+ consecutive
months** (one alone is a signal to watch, not to move):

1. **Organic search traffic** — the app's pages sustain ≥ 3,000 organic
   visits/month (Search Console, pages filtered to `/<app>/`).
2. **Revenue** — the app sustains ≥ $500/month net proceeds, so a dedicated
   domain + content investment has something to amplify.
3. **Brand collision** — the umbrella actively hurts: press/partners need a
   standalone identity, or the audience expects a dedicated product company
   (most likely for a pro tool like Pianotune sold to working professionals).
4. **Content depth** — the app genuinely needs 15+ pages (docs, blog, guides)
   and would benefit from its own topical authority instead of sharing the
   umbrella's mixed topics.

**Never graduate because:** the portfolio "feels random" (see homepage — the
house promise is the glue), a new domain is cheap, or a launch feels like a
fresh start. Preemptive splits reset SEO to zero for nothing.

## Why the move is cheap (pre-engineered)

- Each app is **self-contained** under `src/pages/<app>/` with namespaced
  assets (`/images/<app>-*`), so it lifts out as a folder.
- All canonical/OG/schema URLs derive from **`Astro.site`** — one config value
  to repoint on the new domain.
- **301s pass essentially all ranking signal.** Expect a temporary wobble
  (typically weeks, up to ~2 months) while Google reprocesses.

## Migration playbook

1. Register the new domain; deploy the app's pages at its root (new Vercel
   project or split repo; update `site` in `astro.config.mjs`).
2. On alpinesquad.com, add **permanent redirects** for every old URL:
   `/<app>` and `/<app>/:path*` → the new domain's equivalents
   (vercel.json `"permanent": true` + Astro `redirects`).
3. Keep the app's card on the alpinesquad.com homepage, linking to the new
   domain (portfolio credibility is still worth it).
4. Search Console: add the new property, submit its sitemap, use **Change of
   Address** if the whole section moved.
5. Update the App Store marketing URL, any `ct=` campaign docs, and the
   disclosures redirects for the app.
6. **Keep alpinesquad.com's redirects forever** (~$15/yr). Redirects dying is
   the only way the equity is actually lost.
7. After ~2 months, confirm rankings recovered before investing further.

## Watchlist

| App | Likeliest trigger | Notes |
|---|---|---|
| Pianotune | Brand collision + revenue | Pro tool, professional buyers; strongest standalone-brand case |
| Spelly | Organic traffic | 3 keyword landings already; watch Search Console once domain is live |
| Others | — | Revisit quarterly alongside PORTFOLIO-PLAN.md |
