<script setup lang="ts">
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'
</script>

<template>
  <div class=" bg-slate-100 text-slate-800">
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>

<!-- min-h-screen -->