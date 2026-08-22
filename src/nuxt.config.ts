import { SITE } from './app/utils/site'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    // Vercel Web Analytics: client-only plugin that injects Vercel's script.
    // The Nuxt module lives at the `/nuxt` subpath.
    '@vercel/analytics/nuxt'
  ],
  devtools: { enabled: true },

  // Icon and manifest links are declared here and nowhere else. The rest of
  // the head (charset/viewport/theme-color/canonical + the SEO meta block)
  // lives in `app/app.vue`. Brand name/description/url: `app/utils/site.ts`.
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],

  // Feeds @nuxtjs/sitemap (absolute URLs) and nuxt-site-config.
  site: {
    url: SITE.url,
    name: SITE.name
  },
  ui: {
    colorMode: false
  },

  compatibilityDate: '2025-07-15',

  // Fully static content: `/` plus the 40 `/throws/[id]` pages it links to
  // are prerendered (`crawlLinks` discovers them), and `/sitemap.xml` rides
  // along. Unknown routes still hit the server function and 404.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml']
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
