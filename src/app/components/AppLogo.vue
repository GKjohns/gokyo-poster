<script setup lang="ts">
// Belt-knot mark (obi: band + knot + two tails) with optional "Gentle Way" wordmark.
withDefaults(defineProps<{
  size?: number
  wordmark?: boolean
}>(), { size: 28, wordmark: true })
</script>

<template>
  <div class="inline-flex items-center gap-2 text-ink">
    <svg
      viewBox="0 0 64 64"
      :width="size"
      :height="size"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="24"
        width="56"
        height="12"
        rx="1"
      />
      <rect
        x="24"
        y="20"
        width="16"
        height="20"
        rx="1.25"
      />
      <rect
        x="22"
        y="36"
        width="9"
        height="22"
        rx="1"
        transform="rotate(14 27 38)"
      />
      <rect
        x="33"
        y="36"
        width="9"
        height="22"
        rx="1"
        transform="rotate(-14 37 38)"
      />
    </svg>
    <span
      v-if="wordmark"
      class="font-display leading-none tracking-tight"
    >Gentle Way</span>
  </div>
</template>
