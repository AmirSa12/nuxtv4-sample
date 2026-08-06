<script setup lang="ts">
import type { ProductsSortKey } from '~/types/product'

const props = defineProps<{
  sortBy: ProductsSortKey
  categories: string[]
}>()

const emit = defineEmits<{
  'update:sortBy': [value: ProductsSortKey]
}>()

const sortOptions: Array<{ key: ProductsSortKey, label: string }> = [
  { key: 'count-asc', label: 'تعداد نظر: کم به زیاد' },
  { key: 'count-desc', label: 'تعداد نظر: زیاد به کم' },
  { key: 'rating-asc', label: 'امتیاز: کم به زیاد' },
  { key: 'rating-desc', label: 'امتیاز: زیاد به کم' },
]
</script>

<template>
  <aside class="space-y-4">
    <section class="rounded-2xl bg-white p-4 shadow-sm">
      <h2 class="mb-3 text-sm font-bold text-slate-700">مرتب‌سازی</h2>
      <div class="space-y-2 text-sm text-slate-500">
        <label
          v-for="option in sortOptions"
          :key="option.key"
          class="flex items-center justify-between"
        >
          <span>{{ option.label }}</span>
          <input
            type="radio"
            name="products-sort"
            :checked="props.sortBy === option.key"
            @change="emit('update:sortBy', option.key)"
          >
        </label>
      </div>
    </section>

    <section class="rounded-2xl bg-white p-4 shadow-sm">
      <h2 class="mb-3 text-sm font-bold text-slate-700">دسته‌بندی</h2>
      <ul class="space-y-2 text-sm text-slate-500">
        <li
          v-for="category in categories"
          :key="category"
          class="flex items-center justify-between"
        >
          <span>{{ category }}</span>
          <input type="checkbox">
        </li>
      </ul>
    </section>
  </aside>
</template>
