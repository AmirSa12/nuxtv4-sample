<script setup lang="ts">
import type { ProductsSortKey } from '~/types/product'

const props = defineProps<{
  sortBy: ProductsSortKey
  categories: string[]
}>()

const emit = defineEmits<{
  'update:sortBy': [value: ProductsSortKey]
}>()

const searchTerm = ref('')
const isSortOpen = ref(true)
const isCategoriesOpen = ref(true)

const sortOptions: Array<{ key: ProductsSortKey, label: string }> = [
  { key: 'count-asc', label: 'تعداد: کم به زیاد' },
  { key: 'count-desc', label: 'تعداد: زیاد به کم' },
  { key: 'rating-asc', label: 'رتبه: کم به زیاد' },
  { key: 'rating-desc', label: 'رتبه: زیاد به کم' },
]
</script>

<template>
  <aside class="space-y-4">
    <section class="h-[160px] w-[266px] rounded-[24px] bg-white p-4 shadow-sm">
      <h2 class="mb-2 text-sm font-bold text-slate-700">فیلتر و جستجو</h2>

      <div class="h-10 w-full rounded-[16px] border-[1.5px] border-slate-300 bg-slate-100 px-4 py-3 transition-colors focus-within:border-rose-600 focus-within:bg-white">
        <div dir="rtl" class="flex h-full items-center gap-2">
          <img
            src="/icons/magnifier.svg"
            alt="جستجو"
            class="h-4 w-4 shrink-0"
          >

          <input
            v-model="searchTerm"
            type="text"
            class="min-w-0 flex-1 bg-transparent text-right text-sm font-bold leading-4 text-slate-700 outline-none placeholder:text-slate-700"
            placeholder="دو لنگه"
          >

          <button
            type="button"
            class="shrink-0 text-lg leading-none text-slate-400 hover:text-slate-500"
            @click="searchTerm = ''"
          >
            ×
          </button>
        </div>
      </div>

      <button
        type="button"
        class="mt-3 h-10 w-full rounded-2xl bg-rose-600 text-sm font-bold text-white transition hover:bg-rose-700"
      >
        جستجو
      </button>
    </section>

    <section
      class="w-[266px] overflow-hidden rounded-[24px] bg-white px-4 pt-4 pb-6 shadow-sm transition-all"
      :class="isSortOpen ? 'h-[200px]' : 'h-[64px]'"
    >
      <button type="button" class="flex w-full items-center justify-between text-sm font-bold text-slate-700" @click="isSortOpen = !isSortOpen">
        <span class="inline-flex items-center gap-2">
          <svg
            class="h-4 w-4 transition-transform"
            :class="isSortOpen ? 'rotate-0' : '-rotate-90'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          مرتب‌سازی
        </span>
      </button>

      <div v-if="isSortOpen" class="mt-5 space-y-2 text-sm text-slate-500">
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

    <section
      class="w-[266px] overflow-hidden rounded-[24px] bg-white px-4 pt-4 pb-6 shadow-sm transition-all"
      :class="isCategoriesOpen ? 'h-[180px]' : 'h-[64px]'"
    >
      <button type="button" class="flex w-full items-center justify-between text-sm font-bold text-slate-700" @click="isCategoriesOpen = !isCategoriesOpen">
        <span class="inline-flex items-center gap-2">
          <svg
            class="h-4 w-4 transition-transform"
            :class="isCategoriesOpen ? 'rotate-0' : '-rotate-90'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          دسته‌بندی
        </span>
      </button>

      <ul v-if="isCategoriesOpen" class="mt-5 space-y-2 text-sm text-slate-500">
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
