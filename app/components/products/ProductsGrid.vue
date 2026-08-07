<script setup lang="ts">
import type { ProductCardPreview } from '~/types/product'
import ProductCard from '~/components/products/ProductCard.vue'

defineProps<{
  products: ProductCardPreview[]
  pending: boolean
  hasActiveFilters: boolean
}>()

const emit = defineEmits<{
  clearFilters: []
}>()
</script>

<template>
  <section>
    <div v-if="pending" class="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm">
      در حال دریافت محصولات...
    </div>

    <div v-else-if="!products.length" class="rounded-2xl bg-white p-8 text-center shadow-sm w-[822px]">
      <p class="text-base font-semibold text-slate-700">
        نتیجه‌ای پیدا نشد
      </p>
      <p class="mt-2 text-sm text-slate-500">
        عبارت جستجو یا فیلترها را تغییر دهید.
      </p>
      <button
        v-if="hasActiveFilters"
        type="button"
        class="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
        @click="emit('clearFilters')"
      >
        پاک کردن فیلترها
      </button>
    </div>

    <div
      v-else
      class="grid min-h-[1836px] w-[822px] grid-cols-1 content-start justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>
