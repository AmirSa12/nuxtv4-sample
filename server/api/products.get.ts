import type { Product } from '~/types/product'

const PRODUCTS_ENDPOINT = '/products'

export default defineEventHandler(async () => {
  const { public: publicConfig } = useRuntimeConfig()
  const products = await $fetch<Product[]>(PRODUCTS_ENDPOINT, {
    baseURL: publicConfig.fakeStoreApiBase,
  })

  return products
})
