<script setup lang="ts">
import type { ProductCardPreview } from '~/types/product'

defineProps<{
  product: ProductCardPreview
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(Math.round(price * 100000))
}
</script>

<template>
  <article class="rounded-2xl bg-white p-3 shadow-sm">
    <img
      :src="product.image"
      :alt="product.title"
      class="h-40 w-full rounded-xl object-cover"
      loading="lazy"
    >

    <h3 class="mt-3 min-h-10 text-sm font-semibold text-slate-700">
      {{ product.title }}
    </h3>

    <p class="mt-2 text-xs text-slate-500">
      {{ product.category }}
    </p>

    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm font-bold text-pink-600">
        {{ formatPrice(product.price) }} تومان
      </p>
      <a href="#" class="text-sm font-semibold text-pink-600">
        مشاهده جزئیات
      </a>
    </div>
  </article>
</template>
