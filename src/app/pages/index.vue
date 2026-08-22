<script setup lang="ts">
import type { Technique } from '~/types'
import { groups, techniques } from '~/utils/gokyo'

const flippedId = ref<string | null>(null)
const detail = ref<Technique | null>(null)
const detailOpen = ref(false)

function openDetail(t: Technique) {
  detail.value = t
  detailOpen.value = true
}

// The home title names both the product and the poster; the `· Gentle Way`
// template from app.vue is dropped here to avoid "Gentle Way · Gentle Way".
const title = 'Gentle Way · Gokyo no Waza, the forty throws of Kodokan judo'

useHead({
  titleTemplate: null,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': SITE.org.id,
            'name': SITE.org.name,
            'url': SITE.org.url,
            'logo': SITE.org.logo,
            'sameAs': SITE.org.sameAs
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE.url}/#website`,
            'url': SITE.url,
            'name': SITE.name,
            'description': SITE.description,
            'publisher': { '@id': SITE.org.id },
            'inLanguage': 'en'
          },
          {
            '@type': 'WebApplication',
            '@id': `${SITE.url}/#app`,
            'name': SITE.name,
            'url': SITE.url,
            'applicationCategory': 'EducationalApplication',
            'applicationSubCategory': 'Interactive poster',
            'operatingSystem': 'Any',
            'browserRequirements': 'Requires JavaScript',
            'isAccessibleForFree': true,
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
            'image': `${SITE.url}/og-image.png`,
            'description': SITE.description,
            'datePublished': SITE.launched,
            'about': {
              '@type': 'Thing',
              'name': 'Gokyo no Waza',
              'alternateName': '五教の技',
              'sameAs': 'https://en.wikipedia.org/wiki/Gokyo_(judo)'
            },
            'featureList': [
              'All forty throws of the 1920 Kodokan Gokyo in canonical order',
              'A sumi-e ink rendering of every throw',
              'An everyday scene paired with each throw to show the mechanics',
              'Mechanic, analogy and why-it-maps notes for every throw',
              'Free, no account, works on phone and desktop'
            ],
            'publisher': { '@id': SITE.org.id },
            'creator': { '@id': SITE.org.id }
          },
          {
            '@type': 'ItemList',
            '@id': `${SITE.url}/#gokyo`,
            'name': 'Gokyo no Waza',
            'numberOfItems': techniques.length,
            'itemListOrder': 'ItemListOrderAscending',
            'itemListElement': techniques.map((t, i) => ({
              '@type': 'ListItem',
              'position': i + 1,
              'name': t.romaji,
              'url': `${SITE.url}/throws/${t.id}`
            }))
          }
        ]
      })
    }
  ]
})

useSeoMeta({
  title,
  ogTitle: title
})
</script>

<template>
  <div>
    <UContainer class="max-w-6xl pb-24">
      <AppMasthead />

      <header class="pt-7 pb-7 sm:pt-11 sm:pb-14 grid sm:grid-cols-2 gap-x-12 items-start">
        <h1 class="font-display text-4xl sm:text-[52px] leading-none tracking-[-0.015em] text-ink">
          Gokyo no Waza
        </h1>
        <p class="font-display text-base sm:text-lg leading-normal text-inkmuted max-w-[520px] mt-3 sm:mt-0 sm:pt-1.5">
          The forty throws of Kodokan judo in their 1920 order, each drawn in sumi-e ink.
          <span class="hidden [@media(hover:hover)]:inline">Hover a throw to see the everyday scene that explains its physics, and click for the full story.</span>
          <span class="inline [@media(hover:hover)]:hidden">Tap a throw to see the everyday scene that explains its physics, tap again for the full story.</span>
        </p>
      </header>

      <section
        v-for="group in groups"
        :key="group.id"
        class="mt-14 first-of-type:mt-0"
      >
        <div class="flex items-baseline gap-3 border-b border-hairline pb-2 mb-6">
          <h2 class="font-kanji text-lg text-ink">
            {{ group.kanji }}
          </h2>
          <span class="font-display text-sm text-inkmuted">{{ group.name }}</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          <ThrowCard
            v-for="t in group.techniques"
            :key="t.id"
            :technique="t"
            :flipped="flippedId === t.id"
            @flip="flippedId = t.id"
            @open="openDetail(t)"
          />
        </div>
      </section>

      <AppFooter />
    </UContainer>

    <ThrowDetail
      v-model:open="detailOpen"
      :technique="detail"
    />
  </div>
</template>
