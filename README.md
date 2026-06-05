# alpinesquad-web

Marketing site for [Alpine Squad](https://alpinesquad.com) and its apps. Built with [Astro](https://astro.build) for maximum SEO + zero-JS-by-default speed. Deployed via Vercel.

## Pages

- `/` — Alpine Squad umbrella landing (lists every shipped app)
- `/bibleblitz` — Bible Blitz product page

Add a new app = add a new page under `src/pages/<app-name>/index.astro` + a card to `apps` in `src/pages/index.astro`.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## Deploy

Vercel auto-deploys from `main` on push. First-time setup:

1. Push this repo to GitHub.
2. In Vercel: New Project → import this repo.
3. Framework preset: Astro (auto-detected).
4. Add custom domain `alpinesquad.com` in Vercel project settings.
5. In your DNS provider (where `alpinesquad.com` is registered), point the apex A record to Vercel's IP and `www` to a CNAME — Vercel shows the exact values during domain setup.

## SEO

- Static HTML output (every page is crawlable without JS)
- Per-page `<title>`, `<meta description>`, canonical, OG, Twitter card via `BaseLayout`
- Schema.org JSON-LD on each page (Organization on `/`, MobileApplication on app pages)
- Sitemap auto-generated at `/sitemap-index.xml`
- `robots.txt` allows all crawlers and points at the sitemap
- Apple Smart App Banner meta tag (`apple-itunes-app`) surfaces a "Get" CTA in iOS Safari

## Content updates

Pure content edits = edit the `.astro` file directly. The hero copy, feature list, pricing, and "Who it's for" cards are top-of-file constants in `bibleblitz/index.astro` — no JSX or framework knowledge needed.
