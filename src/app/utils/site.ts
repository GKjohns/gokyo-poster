/**
 * The single brand point. Every crawler-facing string (title template, meta
 * description, canonical / OG URLs, JSON-LD, footer links) hangs off this
 * object. `public/site.webmanifest`, `robots.txt` and `llms.txt` can't import
 * TS, so they mirror these values by hand.
 *
 * `url` has no trailing slash and names the canonical host.
 * Displayed copy uses no em dashes; same rule for everything in here.
 */
export const SITE = {
  name: 'Gentle Way',
  // 160 chars. Used for meta, og, JSON-LD; mirrored by hand in site.webmanifest and llms.txt.
  description: 'An interactive poster of the Gokyo no Waza, the forty throws of Kodokan judo, drawn in sumi-e ink and paired with everyday scenes that make the mechanics click.',
  url: 'https://gentleway.ink',
  github: 'https://github.com/GKjohns/gokyo-poster',
  launched: '2026-08-22',
  org: {
    id: 'https://monumentlabs.io/#org',
    name: 'Monument Labs',
    url: 'https://monumentlabs.io',
    logo: 'https://www.monumentlabs.io/og-image-monument.png',
    sameAs: ['https://www.linkedin.com/company/106072838']
  }
} as const
