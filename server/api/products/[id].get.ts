import type { Product } from '#shared/types/product'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const productId = Number.parseInt(idParam ?? '', 10)

  if (!Number.isInteger(productId) || productId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid product id',
    })
  }

  const { public: publicConfig } = useRuntimeConfig()

  try {
    const product = await $fetch<Product>(`/products/${productId}`, {
      baseURL: publicConfig.fakeStoreApiBase,
    })

    return product
  }
  catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    })
  }
})
