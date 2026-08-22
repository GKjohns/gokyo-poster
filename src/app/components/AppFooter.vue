<script setup lang="ts">
// Shared by `/` and `/throws/[id]`: provenance line + Monument Labs / GitHub attribution.
</script>

<template>
  <footer class="mt-24 border-t border-hairline pt-6 text-center text-xs text-inkmuted">
    <p>
      Sumi-e renderings of the 1920 Kodokan Gokyo. Analogies chosen so a child could feel the mechanics.
    </p>
    <p class="mt-1">
      <a
        :href="SITE.org.url"
        rel="noopener"
        class="underline underline-offset-2 hover:text-seal"
      >Built by Monument Labs</a>
      <span
        aria-hidden="true"
        class="mx-2"
      >·</span>
      <a
        :href="SITE.github"
        rel="noopener"
        class="underline underline-offset-2 hover:text-seal"
      >Source on GitHub</a>
    </p>
  </footer>
</template>
