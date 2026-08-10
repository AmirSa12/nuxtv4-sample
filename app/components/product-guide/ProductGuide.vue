<script setup lang="ts">
import ProductGuideSpotlight from './ProductGuideSpotlight.vue'
import { useProductGuide } from './useProductGuide'

const {
  isOpen,
  isDesktop,
  currentStep,
  targetRect,
  open,
  close,
} = useProductGuide()
</script>

<template>
  <button
    v-if="isDesktop"
    type="button"
    class="fixed top-[132px] right-5 z-40 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E20054]/40 hover:text-[#E20054] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E20054]/40"
    aria-label="باز کردن راهنمای صفحه"
    @click="open"
  >
    <span
      class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#E20054]/10 text-xs font-bold text-[#E20054]"
      aria-hidden="true"
    >
      ؟
    </span>
    راهنما
  </button>

  <ProductGuideSpotlight
    v-if="isOpen && currentStep"
    :step="currentStep"
    :target-rect="targetRect"
    @close="close"
  />
</template>
