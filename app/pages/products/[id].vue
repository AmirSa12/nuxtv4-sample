<script setup lang="ts">
import type { Product } from '#shared/types/product'

const route = useRoute()

const productId = computed(() => Number.parseInt(route.params.id as string, 10))
const hasValidProductId = computed(() => Number.isInteger(productId.value) && productId.value > 0)

const { data: product, pending, error } = await useAsyncData<Product | null>(
  () => `product-detail-${route.params.id}`,
  async () => {
    if (!hasValidProductId.value)
      return null

    return await $fetch<Product>(`/api/products/${productId.value}`)
  },
  { default: () => null },
)

useHead(() => ({
  title: product.value?.title ?? 'جزئیات محصول',
}))
</script>

<template>
  <main class="mx-auto w-full max-w-7xl px-4 py-4 sm:py-6">
    <div v-if="pending" class="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm">
      در حال دریافت اطلاعات محصول...
    </div>

    <div
      v-else-if="!hasValidProductId || error || !product"
      class="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8"
    >
      <p class="text-base font-semibold text-rose-600">
        محصول موردنظر پیدا نشد
      </p>
      <p class="mt-2 text-sm text-slate-500">
        شناسه محصول معتبر نیست یا داده‌ای برای آن وجود ندارد.
      </p>
      <NuxtLink to="/" class="mt-4 inline-flex rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
        بازگشت به لیست محصولات
      </NuxtLink>
    </div>

    <ProductDetailsContent
      v-else
      :title="product.title"
      :image-src="product.image"
    />
  </main>
</template>
