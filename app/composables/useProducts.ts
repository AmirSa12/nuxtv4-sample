import type { Product, ProductCardPreview } from '~/types/product'

const mapToCardPreview = (product: Product): ProductCardPreview => ({
  id: product.id,
  title: product.title,
  price: product.price,
  category: product.category,
  image: product.image,
  ratingRate: product.rating.rate,
  ratingCount: product.rating.count,
})

export const useProducts = () => {
  const { data, pending, error, refresh } = useAsyncData<Product[]>(
    'products-list',
    () => $fetch('/api/products'),
    { default: () => [] },
  )

  const productsForList = computed<ProductCardPreview[]>(() => {
    return (data.value ?? []).map(mapToCardPreview)
  })

  return {
    data,
    productsForList,
    pending,
    error,
    refresh,
  }
}

export const toPersianNumber = (value: number) => value.toLocaleString('fa-IR')
