<script setup lang="ts">
import type { Technique } from '~/types'

const props = defineProps<{
  technique: Technique
  flipped: boolean
}>()

const emit = defineEmits<{
  flip: []
  open: []
}>()

const canHover = ref(true)
onMounted(() => {
  canHover.value = window.matchMedia('(hover: hover)').matches
})

const showAnalogy = computed(() => !canHover.value && props.flipped)

// The card is a real <a href> to /throws/{id} (crawlers, cmd/middle-click,
// open in new tab get the page). A plain click is intercepted and keeps the
// hover/flip/modal behavior; modifier clicks fall through to the browser.
// (A NuxtLink here would SPA-navigate before this handler can prevent it.)
function onClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  if (canHover.value) {
    emit('open')
  } else if (!props.flipped) {
    emit('flip')
  } else {
    emit('open')
  }
}
</script>

<template>
  <a
    :href="`/throws/${technique.id}`"
    class="group block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-seal/60 rounded-sm"
    :aria-label="`${technique.romaji}: open details`"
    @click="onClick"
  >
    <div
      class="relative aspect-square overflow-hidden border border-hairline bg-white rounded-sm"
      :class="{ 'is-flipped': showAnalogy }"
    >
      <img
        :src="`/img/throws/${technique.id}.webp`"
        :alt="`${technique.romaji} (${technique.english}), sumi-e ink drawing of the judo throw`"
        loading="lazy"
        width="640"
        height="640"
        class="absolute inset-0 h-full w-full object-cover"
      >
      <img
        :src="`/img/analogies/${technique.id}.webp`"
        :alt="`${technique.analogy_name}: the everyday analogy for ${technique.romaji}`"
        loading="lazy"
        width="640"
        height="640"
        class="analogy-img absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        :class="{ 'opacity-100': showAnalogy }"
      >
      <div
        class="analogy-caption absolute inset-x-0 bottom-0 translate-y-full bg-paper/95 px-3 py-2 text-xs text-inkmuted transition-transform duration-300 ease-out group-hover:translate-y-0"
        :class="{ 'translate-y-0': showAnalogy }"
      >
        {{ technique.analogy_name }}
      </div>
    </div>
    <div class="mt-2 flex items-baseline justify-between gap-2">
      <span class="font-display text-sm text-ink">{{ technique.romaji }}</span>
      <span class="font-kanji text-xs text-inkmuted">{{ technique.kanji }}</span>
    </div>
  </a>
</template>
