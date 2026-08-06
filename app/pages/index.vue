<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import ProductsFilters from '~/components/products/ProductsFilters.vue'
import ProductsGrid from '~/components/products/ProductsGrid.vue'
import ProductsToolbar from '~/components/products/ProductsToolbar.vue'
import type { ProductCardPreview, ProductsSortKey } from '~/types/product'

const { productsForList, pending, error } = useProducts()
const selectedSort = ref<ProductsSortKey>('count-asc')

useHead({
  title: 'لیست محصولات',
})

const categoryLabelMap: Record<string, string> = {
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
  jewelery: 'زیورآلات',
  electronics: 'لوازم الکترونیکی',
}

const categoryOptions = computed(() => {
  const categories = productsForList.value.map((product) => product.category)
  const uniqueCategories = [...new Set(categories)]
  return uniqueCategories.map((category) => categoryLabelMap[category] ?? category)
})

const sortedProducts = computed<ProductCardPreview[]>(() => {
  const copiedProducts = [...productsForList.value]

  switch (selectedSort.value) {
    case 'count-asc':
      return copiedProducts.sort((a, b) => a.ratingCount - b.ratingCount)
    case 'count-desc':
      return copiedProducts.sort((a, b) => b.ratingCount - a.ratingCount)
    case 'rating-asc':
      return copiedProducts.sort((a, b) => a.ratingRate - b.ratingRate)
    case 'rating-desc':
      return copiedProducts.sort((a, b) => b.ratingRate - a.ratingRate)
    default:
      return copiedProducts
  }
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 py-6">
    <section class="mb-5 rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h1 class="text-base font-bold text-slate-800">
          لیست محصولات
        </h1>
        <p class="text-xs text-slate-500">
          <span v-if="error">خطا در دریافت محصولات</span>
          <span v-else>{{ productsForList.length }} محصول</span>
        </p>
      </div>
    </section>

    <div class="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <ProductsFilters v-model:sort-by="selectedSort" :categories="categoryOptions" />

      <section>
        <ProductsToolbar />
        <ProductsGrid :products="sortedProducts" :pending="pending" />
      </section>
    </div>
  </main>
</template>
