<script setup lang="ts">
import type { ProductCardPreview } from '~/types/product'

defineProps<{
  product: ProductCardPreview
}>()
</script>

<template>
  <article class="flex h-[286px] w-[263.333px] flex-col rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
    <img
      :src="product.image"
      :alt="product.title"
      class="h-[160px] w-full rounded-[18px] object-contain object-center"
      loading="lazy"
    >

    <div class="mt-3 h-[72px] overflow-hidden">
      <h3 dir="ltr" class="text-left font-bold text-[14px] leading-[24px] tracking-[0] text-slate-800">
        {{ product.title }}
      </h3>
    </div>

    <div class="mt-auto h-[40px] w-[239px] self-center rounded-[16px] border-[1.5px] border-slate-200 px-4 py-3">
      <NuxtLink :to="`/products/${product.id}`" class="flex h-full w-full items-center justify-center gap-2 text-center text-[14px] font-bold leading-[16px] tracking-[0] text-rose-500">
        مشاهده جزئیات
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>
