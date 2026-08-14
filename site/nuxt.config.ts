// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
  },
  app: {
    head: {
      title: 'Gokyo no Waza',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'The 40 throws of Kodokan judo — and the everyday physics that explain them.' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
