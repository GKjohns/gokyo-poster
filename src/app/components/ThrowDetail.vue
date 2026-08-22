<script setup lang="ts">
import type { Technique } from '~/types'

defineProps<{
  technique: Technique | null
}>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UModal
    v-model:open="open"
    :title="technique?.romaji"
    :description="technique?.english"
    :ui="{ content: 'max-w-4xl bg-paper divide-y-0 rounded-sm' }"
  >
    <template #content>
      <div
        v-if="technique"
        class="p-6 sm:p-8 max-h-[85vh] overflow-y-auto overscroll-contain"
      >
        <div class="flex items-baseline justify-between gap-4">
          <h2 class="font-display text-2xl text-ink">
            {{ technique.romaji }}
            <span class="font-kanji text-xl text-inkmuted ml-2">{{ technique.kanji }}</span>
          </h2>
          <p class="text-xs uppercase tracking-widest text-seal shrink-0">
            {{ technique.english }}
          </p>
        </div>

        <div class="mt-5 grid gap-4 sm:grid-cols-2">
          <figure class="border border-hairline bg-white rounded-sm overflow-hidden">
            <img
              :src="`/img/throws/${technique.id}-lg.webp`"
              :alt="`${technique.romaji} (${technique.english}), sumi-e ink drawing of the judo throw`"
              width="1024"
              height="1024"
              class="w-full h-auto"
            >
            <figcaption class="px-3 py-2 text-xs text-inkmuted border-t border-hairline">
              The throw
            </figcaption>
          </figure>
          <figure class="border border-hairline bg-white rounded-sm overflow-hidden">
            <img
              :src="`/img/analogies/${technique.id}-lg.webp`"
              :alt="`${technique.analogy_name}: the everyday analogy for ${technique.romaji}`"
              width="1024"
              height="1024"
              class="w-full h-auto"
            >
            <figcaption class="px-3 py-2 text-xs text-inkmuted border-t border-hairline">
              {{ technique.analogy_name }}
            </figcaption>
          </figure>
        </div>

        <div class="mt-6 space-y-4 max-w-prose">
          <p class="text-sm leading-relaxed text-ink">
            {{ technique.mechanic }}
          </p>
          <p class="text-sm leading-relaxed text-ink">
            {{ technique.analogy }}
          </p>
          <p class="border-l-2 border-seal pl-3 text-sm italic leading-relaxed text-inkmuted">
            {{ technique.why_it_maps }}
          </p>
        </div>

        <div class="mt-6 border-t border-hairline pt-4 text-xs text-inkmuted">
          <NuxtLink
            :to="`/throws/${technique.id}`"
            class="underline underline-offset-2 hover:text-seal"
          >Open page →</NuxtLink>
        </div>
      </div>
    </template>
  </UModal>
</template>
