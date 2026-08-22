<script setup lang="ts">
import { findTechnique, neighbors } from '~/utils/gokyo'

const route = useRoute()
const t = findTechnique(route.params.id as string)
if (!t) {
  throw createError({ statusCode: 404, statusMessage: 'Throw not found', fatal: true })
}

const { prev, next } = neighbors(t.id)
const url = `${SITE.url}/throws/${t.id}`
const throwAlt = `${t.romaji} (${t.english}), sumi-e ink drawing of the judo throw`
const analogyAlt = `${t.analogy_name}: the everyday analogy for ${t.romaji}`

// Meta description: whole sentences from the mechanic while they fit in 155
// chars; if even the first one is too long, cut at a word and mark it.
function summarize(text: string, max = 155) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map(s => s.trim()) ?? [text]
  let out = ''
  for (const s of sentences) {
    if ((out + ' ' + s).trim().length > max) break
    out = (out + ' ' + s).trim()
  }
  if (out) return out
  const cut = text.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}
const description = summarize(t.mechanic)

function imageObject(contentUrl: string, caption: string) {
  return {
    '@type': 'ImageObject',
    contentUrl,
    'width': 1024,
    'height': 1024,
    caption,
    'creator': { '@id': SITE.org.id },
    'creditText': SITE.org.name,
    'description': 'AI-generated sumi-e rendering'
  }
}
const throwImage = imageObject(`${SITE.url}/img/throws/${t.id}-lg.webp`, throwAlt)
const analogyImage = imageObject(`${SITE.url}/img/analogies/${t.id}-lg.webp`, analogyAlt)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': url,
            url,
            'name': `${t.romaji} (${t.kanji}) · ${t.english}`,
            description,
            'isPartOf': { '@id': `${SITE.url}/#website` },
            'datePublished': SITE.launched,
            'primaryImageOfPage': throwImage,
            'image': [throwImage, analogyImage],
            'about': {
              '@type': 'Thing',
              'name': t.romaji,
              'alternateName': [t.kanji, t.english],
              'description': t.mechanic
            },
            'publisher': { '@id': SITE.org.id },
            'creator': { '@id': SITE.org.id },
            'inLanguage': 'en'
          }
        ]
      })
    }
  ]
})

const title = `${t.romaji} (${t.kanji}) · ${t.english}`
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogImage: `${SITE.url}/og/${t.id}.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: `${t.romaji}: the throw and its everyday analogy`,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <UContainer class="max-w-4xl pb-24">
      <AppMasthead>
        <template #right>
          <NuxtLink
            to="/"
            class="font-display text-base sm:text-lg text-inkmuted hover:text-seal"
          >All forty throws</NuxtLink>
        </template>
      </AppMasthead>

      <main class="mt-10 sm:mt-14">
        <header>
          <p class="text-xs uppercase tracking-widest text-inkmuted">
            <span class="font-kanji normal-case tracking-normal">{{ t.group.kanji }}</span> · {{ t.group.name }}
          </p>
          <div class="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h1 class="font-display text-3xl sm:text-4xl text-ink">
              {{ t.romaji }}
              <span class="font-kanji text-2xl sm:text-3xl text-inkmuted ml-2">{{ t.kanji }}</span>
            </h1>
            <p class="text-xs uppercase tracking-widest text-seal shrink-0">
              {{ t.english }}
            </p>
          </div>
        </header>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <figure class="border border-hairline bg-white rounded-sm overflow-hidden">
            <img
              :src="`/img/throws/${t.id}-lg.webp`"
              :srcset="`/img/throws/${t.id}.webp 640w, /img/throws/${t.id}-lg.webp 1024w`"
              sizes="(min-width: 640px) 50vw, 100vw"
              :alt="throwAlt"
              width="1024"
              height="1024"
              loading="eager"
              fetchpriority="high"
              class="w-full h-auto"
            >
            <figcaption class="px-3 py-2 text-xs text-inkmuted border-t border-hairline">
              The throw
            </figcaption>
          </figure>
          <figure class="border border-hairline bg-white rounded-sm overflow-hidden">
            <img
              :src="`/img/analogies/${t.id}-lg.webp`"
              :srcset="`/img/analogies/${t.id}.webp 640w, /img/analogies/${t.id}-lg.webp 1024w`"
              sizes="(min-width: 640px) 50vw, 100vw"
              :alt="analogyAlt"
              width="1024"
              height="1024"
              loading="lazy"
              class="w-full h-auto"
            >
            <figcaption class="px-3 py-2 text-xs text-inkmuted border-t border-hairline">
              {{ t.analogy_name }}
            </figcaption>
          </figure>
        </div>

        <div class="mt-10 max-w-prose">
          <section>
            <h2 class="text-xs uppercase tracking-widest text-inkmuted">
              Mechanic
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-ink">
              {{ t.mechanic }}
            </p>
          </section>
          <section class="mt-6">
            <h2 class="text-xs uppercase tracking-widest text-inkmuted">
              Analogy
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-ink">
              {{ t.analogy }}
            </p>
          </section>
          <section class="mt-6">
            <h2 class="text-xs uppercase tracking-widest text-inkmuted">
              Why it maps
            </h2>
            <p class="mt-2 border-l-2 border-seal pl-3 text-sm italic leading-relaxed text-inkmuted">
              {{ t.why_it_maps }}
            </p>
          </section>
        </div>

        <nav
          class="mt-12 flex items-baseline justify-between gap-4 border-t border-hairline pt-4 text-sm"
          aria-label="Previous and next throw"
        >
          <NuxtLink
            :to="`/throws/${prev.id}`"
            class="font-display text-ink hover:text-seal"
            rel="prev"
          >← {{ prev.romaji }}</NuxtLink>
          <NuxtLink
            :to="`/throws/${next.id}`"
            class="font-display text-ink hover:text-seal text-right"
            rel="next"
          >{{ next.romaji }} →</NuxtLink>
        </nav>
      </main>

      <AppFooter />
    </UContainer>
  </div>
</template>
