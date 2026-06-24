/**
 * Shared SEO / app-attribution helpers.
 *
 * Kept tiny on purpose — these are the only pieces reused across pages.
 * Everything URL-shaped derives from the page's `Astro.site` so a future
 * domain move stays a one-line config change.
 */

export const APP_IDS = {
  spelly: '6757465281',
  bibleBlitz: '6771674002',
} as const;

/**
 * App Store link with an optional App Analytics campaign token (`ct`).
 * The token surfaces in App Store Connect → App Analytics → Acquisition →
 * Campaigns, so each landing page's install contribution is attributable.
 * Unknown params are ignored by the App Store, so this is always safe.
 */
export function appStoreUrl(id: string, campaign?: string): string {
  const base = `https://apps.apple.com/app/id${id}`;
  return campaign ? `${base}?ct=${encodeURIComponent(campaign)}` : base;
}

type Crumb = { name: string; path: string };

/** Schema.org BreadcrumbList for a page's place in the site hierarchy. */
export function breadcrumbList(site: string, items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site}${it.path}`,
    })),
  };
}
