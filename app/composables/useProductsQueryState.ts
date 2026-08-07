import type { LocationQuery, LocationQueryValue } from 'vue-router'
import type { ProductsSortKey } from '~/types/product'

const VALID_SORTS: ProductsSortKey[] = ['count-asc', 'count-desc', 'rating-asc', 'rating-desc']

const normalizeQueryValue = (value: LocationQueryValue | LocationQueryValue[] | undefined): string => {
  if (Array.isArray(value))
    return value[0] ?? ''

  return value ?? ''
}

const parseCsvQuery = (value: LocationQueryValue | LocationQueryValue[] | undefined): string[] => {
  const normalized = normalizeQueryValue(value).trim()
  if (!normalized)
    return []

  return normalized.split(',').map(item => item.trim()).filter(Boolean)
}

export const useProductsQueryState = () => {
  const route = useRoute()
  const router = useRouter()

  const sortBy = computed<ProductsSortKey>(() => {
    const sort = normalizeQueryValue(route.query.sort)
    if (VALID_SORTS.includes(sort as ProductsSortKey))
      return sort as ProductsSortKey

    return 'count-asc'
  })
  const isSortExplicit = computed(() => VALID_SORTS.includes(normalizeQueryValue(route.query.sort) as ProductsSortKey))

  const searchQuery = computed(() => normalizeQueryValue(route.query.q).trim())

  const selectedCategories = computed(() => parseCsvQuery(route.query.category))

  const page = computed<number>(() => {
    const rawPage = Number.parseInt(normalizeQueryValue(route.query.page), 10)
    if (Number.isNaN(rawPage) || rawPage < 1)
      return 1

    return rawPage
  })

  const replaceQuery = async (
    patch: Record<string, string | undefined>,
    options?: { resetPage?: boolean },
  ) => {
    const nextQuery: LocationQuery = { ...route.query }

    for (const [key, value] of Object.entries(patch)) {
      if (!value)
        delete nextQuery[key]
      else
        nextQuery[key] = value
    }

    if (options?.resetPage)
      delete nextQuery.page

    await router.replace({ query: nextQuery })
  }

  const setSearchQuery = async (value: string) => {
    await replaceQuery({ q: value.trim() || undefined }, { resetPage: true })
  }

  const setSortBy = async (value: ProductsSortKey) => {
    await replaceQuery({ sort: value }, { resetPage: true })
  }

  const clearSort = async () => {
    await replaceQuery({ sort: undefined }, { resetPage: true })
  }

  const setSelectedCategories = async (values: string[]) => {
    const uniqueValues = [...new Set(values.filter(Boolean))]
    await replaceQuery(
      { category: uniqueValues.length ? uniqueValues.join(',') : undefined },
      { resetPage: true },
    )
  }

  const setPage = async (value: number) => {
    const normalizedPage = Math.max(1, Math.floor(value))
    await replaceQuery({ page: normalizedPage > 1 ? String(normalizedPage) : undefined })
  }

  const clearFilters = async () => {
    await replaceQuery({
      category: undefined,
      page: undefined,
      q: undefined,
      sort: undefined,
    })
  }

  return {
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
  }
}
