export type ProductsSortKey = 'rating-asc' | 'rating-desc' | 'count-asc' | 'count-desc'

export interface ProductRating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export interface ProductCardPreview {
  id: number
  title: string
  price: number
  category: string
  image: string
  ratingRate: number
  ratingCount: number
}
