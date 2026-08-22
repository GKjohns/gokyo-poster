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
    <header class="pt-20 pb-14 sm:pt-28 sm:pb-16 text-center px-4">
      <div class="flex flex-col items-center gap-3 mb-10 sm:mb-12">
        <NuxtLink
          to="/"
          class="inline-flex hover:text-seal"
          aria-label="Gentle Way home"
        >
          <AppLogo :size="24" />
        </NuxtLink>
        <p class="text-xs uppercase tracking-widest text-inkmuted">
          <span class="font-kanji normal-case tracking-normal">柔道</span> · jūdō · the gentle way
        </p>
      </div>
      <p class="font-kanji text-5xl sm:text-6xl text-ink tracking-wide">
        五教の技
      </p>
      <h1 class="font-display text-2xl sm:text-3xl mt-4 text-ink">
        Gokyo no Waza
      </h1>
      <p class="mt-3 text-sm text-inkmuted max-w-md mx-auto">
        The forty throws of Kodokan judo, and the everyday physics that explain them.
      </p>
      <div
        class="mx-auto mt-8 h-1.5 w-1.5 rounded-full bg-seal"
        aria-hidden="true"
      />
      <p class="mt-8 text-xs uppercase tracking-widest text-inkmuted">
        <span class="hidden [@media(hover:hover)]:inline">Hover a throw to see how it feels</span>
        <span class="inline [@media(hover:hover)]:hidden">Tap a throw to see how it feels. Tap again for the story</span>
      </p>
    </header>

    <UContainer class="max-w-6xl pb-24">
      <section
        v-for="group in groups"
        :key="group.id"
        class="mt-14 first:mt-0"
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
