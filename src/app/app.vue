<script setup lang="ts">
const route = useRoute()

// Every crawler-facing absolute URL hangs off SITE.url (`app/utils/site.ts`).
// Trailing slashes are stripped so /x and /x/ don't advertise two canonicals.
const canonical = computed(() => SITE.url + (route.path === '/' ? '' : route.path.replace(/\/$/, '')))

// Icon and manifest links live in nuxt.config's app.head, declared once.
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: '#faf8f4' }
  ],
  link: [
    { rel: 'canonical', href: canonical }
  ]
})

useSeoMeta({
  title: SITE.name,
  titleTemplate: `%s · ${SITE.name}`,
  description: SITE.description,
  ogTitle: SITE.name,
  ogDescription: SITE.description,
  ogType: 'website',
  ogSiteName: SITE.name,
  ogUrl: canonical,
  ogImage: `${SITE.url}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'Gentle Way: the forty throws of Kodokan judo',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
