import type { Ref } from 'vue'
import type { ProductCardPreview, ProductFilterChip, ProductsSortKey } from '~/types/product'

export const PRODUCTS_PER_PAGE = 18

const SORT_LABELS: Record<ProductsSortKey, string> = {
  'count-asc': 'تعداد: کم به زیاد',
  'count-desc': 'تعداد: زیاد به کم',
  'rating-asc': 'رتبه: کم به زیاد',
  'rating-desc': 'رتبه: زیاد به کم',
}

const sortProductsStable = (products: ProductCardPreview[], sortBy: ProductsSortKey): ProductCardPreview[] => {
  const withIndex = products.map((product, index) => ({ product, index }))
  return withIndex
    .sort((a, b) => {
      let diff = 0
      if (sortBy === 'count-asc')
        diff = a.product.ratingCount - b.product.ratingCount
      else if (sortBy === 'count-desc')
        diff = b.product.ratingCount - a.product.ratingCount
      else if (sortBy === 'rating-asc')
        diff = a.product.ratingRate - b.product.ratingRate
      else if (sortBy === 'rating-desc')
        diff = b.product.ratingRate - a.product.ratingRate

      if (diff !== 0)
        return diff

      return a.index - b.index
    })
    .map(item => item.product)
}

export const useProductsCatalog = (
  products: Ref<ProductCardPreview[]>,
  searchQuery: Ref<string>,
  selectedCategories: Ref<string[]>,
  sortBy: Ref<ProductsSortKey>,
  isSortExplicit: Ref<boolean>,
  page: Ref<number>,
  categoryLabelMap: Ref<Record<string, string>>,
) => {
  const normalizedSearch = computed(() => searchQuery.value.trim().toLowerCase())
  const selectedCategoriesSet = computed(() => new Set(selectedCategories.value))

  const filteredProducts = computed(() => {
    const search = normalizedSearch.value
    const activeCategories = selectedCategoriesSet.value

    return products.value.filter((product) => {
      const matchesSearch = !search || product.title.toLowerCase().includes(search)
      const matchesCategory = !activeCategories.size || activeCategories.has(product.category)
      return matchesSearch && matchesCategory
    })
  })

  const sortedProducts = computed(() => sortProductsStable(filteredProducts.value, sortBy.value))

  const totalCount = computed(() => sortedProducts.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / PRODUCTS_PER_PAGE)))
  const safePage = computed(() => Math.min(page.value, totalPages.value))

  const paginatedProducts = computed(() => {
    const startIndex = (safePage.value - 1) * PRODUCTS_PER_PAGE
    return sortedProducts.value.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  })

  const activeChips = computed<ProductFilterChip[]>(() => {
    const chips: ProductFilterChip[] = []

    if (searchQuery.value.trim()) {
      chips.push({
        id: 'search',
        kind: 'search',
        label: searchQuery.value.trim(),
      })
    }

    if (isSortExplicit.value) {
      chips.push({
        id: 'sort',
        kind: 'sort',
        label: SORT_LABELS[sortBy.value],
      })
    }

    for (const category of selectedCategories.value) {
      chips.push({
        id: `category:${category}`,
        kind: 'category',
        label: categoryLabelMap.value[category] ?? category,
      })
    }

    return chips
  })

  return {
    activeChips,
    paginatedProducts,
    safePage,
    totalCount,
    totalPages,
  }
}
