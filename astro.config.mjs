import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Alpine Squad's marketing site — umbrella for every app we ship.
// One repo, one Vercel deploy, file-based routes per app.
//
// Routes today:
//   /                — Alpine Squad landing (what is this, what's shipped)
//   /bibleblitz      — Bible Blitz product page
//   /bibleblitz/privacy + /terms — Disclosure pages (mirrors disclosures repo)
//
// SEO is the headline feature here. Astro outputs static HTML, zero JS by
// default, with sitemap + robots + structured data per page. Lighthouse
// targets: 100/100/100/100.
export default defineConfig({
  site: 'https://alpinesquad.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
