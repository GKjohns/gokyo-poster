<script setup lang="ts">
// Editorial masthead shared by `/` and `/throws/[id]`: an ink rule, the brand
// on the left, a hairline rule below. The right side defaults to the 柔道 tag;
// pages can replace it through the `right` slot (the throw page puts its
// "All forty throws" link there).
</script>

<template>
  <div class="sm:mt-7 h-14 flex items-center justify-between border-t border-ink border-b border-hairline">
    <NuxtLink
      to="/"
      class="inline-flex text-lg hover:text-seal [&_svg]:size-7 sm:[&_svg]:size-8"
      aria-label="Gentle Way home"
    >
      <AppLogo :size="32" />
    </NuxtLink>
    <slot name="right">
      <span class="font-display text-base sm:text-lg text-inkmuted">
        <span class="font-kanji text-ink mr-2.5">柔道</span>the gentle way
      </span>
    </slot>
  </div>
</template>
