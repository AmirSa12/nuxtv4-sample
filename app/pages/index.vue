<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { productsForList, pending, error } = useProducts()

watch(
  [productsForList, error],
  ([nextProducts, nextError]) => {
    if (nextError) {
      console.error(nextError)
      return
    }

    if (nextProducts.length > 0) {
      console.log(nextProducts)
    }
  },
  { immediate: true },
)
</script>

<template>
  <main class="p-6">
    <h1 class="text-lg font-semibold">Products</h1>
    <p v-if="pending" class="mt-2 text-sm text-gray-600">
      Loading products...
    </p>
    <p v-else class="mt-2 text-sm text-gray-600">
      Products fetched.
    </p>
  </main>
</template>
