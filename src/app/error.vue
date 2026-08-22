<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)
const title = computed(() => is404.value ? 'Throw not found' : 'Something slipped')

useHead({
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: title.value,
  titleTemplate: `%s · ${SITE.name}`,
  robots: 'noindex'
})

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
      <NuxtLink
        to="/"
        class="inline-flex"
        aria-label="Gentle Way home"
        @click.prevent="goHome"
      >
        <AppLogo :size="32" />
      </NuxtLink>
      <p class="mt-10 text-xs uppercase tracking-widest text-inkmuted">
        {{ error?.statusCode || 500 }}
      </p>
      <h1 class="font-display text-2xl sm:text-3xl mt-3 text-ink">
        {{ title }}
      </h1>
      <p class="mt-3 text-sm text-inkmuted max-w-md">
        <template v-if="is404">
          There is no throw at this address. The forty are all on the poster.
        </template>
        <template v-else>
          Something went wrong on our side. Reload, or go back to the poster.
        </template>
      </p>
      <a
        href="/"
        class="mt-8 text-sm underline underline-offset-2 hover:text-seal"
        @click.prevent="goHome"
      >Back to the poster</a>
    </div>
  </UApp>
</template>
