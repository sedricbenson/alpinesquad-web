import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Alpine Squad's marketing site — umbrella for every app we ship.
// One repo, one Vercel deploy, file-based routes per app.
//
// Routes today:
//   /                          — Alpine Squad landing (lists every shipped app)
//   /bible-blitz               — Bible Blitz product page
//   /spelly + /spelly/*        — Spelly product page + keyword landing pages
//   /{bible-blitz,spelly}/{privacy,terms} — redirect to the disclosures repo
//
// SEO is the headline feature here. Astro outputs static HTML, zero JS by
// default, with sitemap + robots + structured data per page. Lighthouse
// targets: 100/100/100/100.
export default defineConfig({
  site: 'https://alpinesquad.com',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const liveApps = ['/spelly/', '/bible-blitz/', '/hamcram/'];
        const comingSoon = ['/scratchy/', '/pianotune/', '/musicquest/'];
        if (path === '/') item.priority = 1.0;
        else if (liveApps.includes(path)) item.priority = 0.9;
        else if (comingSoon.includes(path)) item.priority = 0.8;
        else item.priority = 0.7;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
