<script setup lang="ts">
import gokyo from '~/assets/gokyo.json'
import type { Group, Technique } from '~/types'

const groups = gokyo.groups as Group[]

const flippedId = ref<string | null>(null)
const detail = ref<Technique | null>(null)
const detailOpen = ref(false)

function openDetail(t: Technique) {
  detail.value = t
  detailOpen.value = true
}
</script>

<template>
  <div>
    <header class="pt-20 pb-14 sm:pt-28 sm:pb-16 text-center px-4">
      <p class="font-kanji text-5xl sm:text-6xl text-ink tracking-wide">
        五教の技
      </p>
      <h1 class="font-display text-2xl sm:text-3xl mt-4 text-ink">
        Gokyo no Waza
      </h1>
      <p class="mt-3 text-sm text-inkmuted max-w-md mx-auto">
        The forty throws of Kodokan judo — and the everyday physics that explain them.
      </p>
      <div
        class="mx-auto mt-8 h-1.5 w-1.5 rounded-full bg-seal"
        aria-hidden="true"
      />
      <p class="mt-8 text-xs uppercase tracking-widest text-inkmuted">
        <span class="hidden [@media(hover:hover)]:inline">Hover a throw to see how it feels</span>
        <span class="inline [@media(hover:hover)]:hidden">Tap a throw to see how it feels — tap again for the story</span>
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

      <footer class="mt-24 border-t border-hairline pt-6 text-center text-xs text-inkmuted">
        <p>
          Sumi-e renderings of the 1920 Kodokan Gokyo. Analogies chosen so a child could feel the mechanics.
        </p>
        <p class="mt-1">
          <a
            href="https://github.com/GKjohns/gokyo-poster"
            class="underline underline-offset-2 hover:text-seal"
          >gokyo-poster on GitHub</a>
        </p>
      </footer>
    </UContainer>

    <ThrowDetail
      v-model:open="detailOpen"
      :technique="detail"
    />
  </div>
</template>
