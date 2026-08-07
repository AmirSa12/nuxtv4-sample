<script setup lang="ts">
import type { ProductCardPreview, ProductFilterChip, ProductCategoryOption } from '~/types/product'
import { useProducts } from '~/composables/useProducts'
import { useProductsCatalog } from '~/composables/useProductsCatalog'
import { useProductsQueryState } from '~/composables/useProductsQueryState'
import ProductsFilters from '~/components/products/ProductsFilters.vue'
import ProductsGrid from '~/components/products/ProductsGrid.vue'
import ProductsToolbar from '~/components/products/ProductsToolbar.vue'

const { productsForList, pending, error } = useProducts()
const {
  clearFilters,
  clearSort,
  isSortExplicit,
  page,
  searchQuery,
  selectedCategories,
  setPage,
  setSearchQuery,
  setSelectedCategories,
  setSortBy,
  sortBy,
} = useProductsQueryState()

useHead({
  title: 'لیست محصولات',
})

const categoryLabelMap: Record<string, string> = {
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
  jewelery: 'زیورآلات',
  electronics: 'لوازم الکترونیکی',
}

const categoryOptions = computed<ProductCategoryOption[]>(() => {
  const categories = productsForList.value.map((product) => product.category)
  const uniqueCategories = [...new Set(categories)]
  return uniqueCategories.map((category) => ({
    label: categoryLabelMap[category] ?? category,
    value: category,
  }))
})

const categoryLabelsByValue = computed<Record<string, string>>(() => {
  return categoryOptions.value.reduce<Record<string, string>>((acc, option) => {
    acc[option.value] = option.label
    return acc
  }, {})
})

const {
  activeChips,
  paginatedProducts,
  safePage,
  totalCount,
  totalPages,
} = useProductsCatalog(
  productsForList,
  searchQuery,
  selectedCategories,
  sortBy,
  isSortExplicit,
  page,
  categoryLabelsByValue,
)

const removeChip = async (chip: ProductFilterChip) => {
  if (chip.kind === 'search') {
    await setSearchQuery('')
    return
  }

  if (chip.kind === 'sort') {
    await clearSort()
    return
  }

  if (chip.kind === 'category') {
    const categoryValue = chip.id.replace('category:', '')
    await setSelectedCategories(selectedCategories.value.filter(value => value !== categoryValue))
  }
}

const hasActiveFilters = computed(() => activeChips.value.length > 0)

const goToPreviousPage = async () => {
  await setPage(Math.max(1, safePage.value - 1))
}

const goToNextPage = async () => {
  await setPage(Math.min(totalPages.value, safePage.value + 1))
}
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 py-6">
    <div class="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <ProductsFilters
        :sort-by="sortBy"
        :has-explicit-sort="isSortExplicit"
        :search-query="searchQuery"
        :selected-categories="selectedCategories"
        :categories="categoryOptions"
        @update:sort-by="setSortBy"
        @update:search-query="setSearchQuery"
        @update:selected-categories="setSelectedCategories"
      />

      <section>
        <div
          v-if="error"
          class="mb-4 rounded-2xl bg-white p-6 text-center shadow-sm"
        >
          <p class="text-base font-semibold text-rose-600">
            خطا در دریافت محصولات
          </p>
          <p class="mt-2 text-sm text-slate-500">
            لطفا صفحه را تازه‌سازی کنید یا چند دقیقه دیگر دوباره تلاش کنید.
          </p>
        </div>

        <ProductsToolbar
          :chips="activeChips"
          :total-count="totalCount"
          @remove-chip="removeChip"
          @clear-all="clearFilters"
        />
        <ProductsGrid
          :products="paginatedProducts"
          :pending="pending"
          :has-active-filters="hasActiveFilters"
          @clear-filters="clearFilters"
        />

        <nav
          v-if="!pending && !error && totalPages > 1"
          class="mt-5 flex w-[822px] items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
          aria-label="pagination"
        >
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="safePage <= 1"
            @click="goToPreviousPage"
          >
            قبلی
          </button>
          <p class="text-sm text-slate-600">
            صفحه {{ toPersianNumber(safePage) }} از {{ toPersianNumber(totalPages) }} 
          </p>
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="safePage >= totalPages"
            @click="goToNextPage"
          >
            بعدی
          </button>
        </nav>
      </section>
    </div>
  </main>
</template>
