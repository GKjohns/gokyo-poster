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

function onClick() {
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
  <button
    type="button"
    class="group block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-seal/60 rounded-sm"
    :aria-label="`${technique.romaji} — open details`"
    @click="onClick"
  >
    <div
      class="relative aspect-square overflow-hidden border border-hairline bg-white rounded-sm"
      :class="{ 'is-flipped': showAnalogy }"
    >
      <img
        :src="`/img/throws/${technique.id}.webp`"
        :alt="`${technique.romaji} — the throw`"
        loading="lazy"
        width="640"
        height="640"
        class="absolute inset-0 h-full w-full object-cover"
      >
      <img
        :src="`/img/analogies/${technique.id}.webp`"
        :alt="technique.analogy_name"
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
  </button>
</template>
