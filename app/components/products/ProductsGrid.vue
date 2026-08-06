<script setup lang="ts">
import type { ProductCardPreview } from '~/types/product'
import ProductCard from '~/components/products/ProductCard.vue'

defineProps<{
  products: ProductCardPreview[]
  pending: boolean
}>()
</script>

<template>
  <section>
    <div v-if="pending" class="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm">
      در حال دریافت محصولات...
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
