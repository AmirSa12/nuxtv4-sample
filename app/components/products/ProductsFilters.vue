<script setup lang="ts">
import type { ProductCategoryOption, ProductsSortKey } from '#shared/types/product'

const props = defineProps<{
  sortBy: ProductsSortKey
  hasExplicitSort: boolean
  categories: ProductCategoryOption[]
  selectedCategories: string[]
  searchQuery: string
}>()

const emit = defineEmits<{
  'update:sortBy': [value: ProductsSortKey]
  'update:searchQuery': [value: string]
  'update:selectedCategories': [value: string[]]
}>()

const searchTerm = ref(props.searchQuery)
const isSortOpen = ref(false)
const isCategoriesOpen = ref(false)

const sortOptions: Array<{ key: ProductsSortKey, label: string }> = [
  { key: 'count-asc', label: 'تعداد: کم به زیاد' },
  { key: 'count-desc', label: 'تعداد: زیاد به کم' },
  { key: 'rating-asc', label: 'رتبه: کم به زیاد' },
  { key: 'rating-desc', label: 'رتبه: زیاد به کم' },
]

watch(
  () => props.searchQuery,
  (newValue) => {
    if (newValue !== searchTerm.value)
      searchTerm.value = newValue
  },
)

const clearSearch = () => {
  searchTerm.value = ''
  emit('update:searchQuery', '')
}

const submitSearch = () => {
  emit('update:searchQuery', searchTerm.value.trim())
}

const toggleCategory = (categoryValue: string, checked: boolean) => {
  const nextCategories = new Set(props.selectedCategories)
  if (checked)
    nextCategories.add(categoryValue)
  else
    nextCategories.delete(categoryValue)

  emit('update:selectedCategories', [...nextCategories])
}
</script>

<template>
  <aside class="w-full space-y-4 lg:max-w-[266px]">
    <section class="w-full rounded-[24px] bg-white p-4 shadow-sm">
      <h2 id="products-search-title" class="mb-2 text-sm font-bold text-slate-700">فیلتر و جستجو</h2>

      <label class="sr-only" for="products-search-input">جستجو در عنوان محصولات</label>
      <div class="h-10 w-full rounded-[16px] border-[1.5px] border-slate-300 bg-slate-100 px-4 py-3 transition-colors focus-within:border-rose-600 focus-within:bg-white">
        <div dir="rtl" class="flex h-full items-center gap-2">
          <div class="border-l-[2px] border-[#D1DBE8] pl-2">
            <img
              src="/icons/other/magnifier.svg"
              alt="جستجو"
              class="h-4 w-4 shrink-0"
            >
          </div>

          <input
            id="products-search-input"
            v-model="searchTerm"
            type="text"
            class="min-w-0 flex-1 bg-transparent text-right text-sm font-bold leading-4 text-slate-700 outline-none placeholder:text-slate-700"
            autocomplete="off"
            aria-labelledby="products-search-title"
            @keydown.enter.prevent="submitSearch"
          >

          <button
            type="button"
            class="inline-flex h-8 w-8 shrink-0 items-center justify-center text-lg leading-none text-slate-400 hover:text-slate-500"
            aria-label="پاک کردن جستجو"
            @click="clearSearch"
          >
            ×
          </button>
        </div>
      </div>

      <button
        type="button"
        class="mt-3 h-10 w-full rounded-2xl bg-rose-600 text-sm font-bold text-white transition hover:bg-rose-700"
        @click="submitSearch"
      >
        جستجو
      </button>
    </section>

    <section
      class="w-full overflow-hidden rounded-[24px] bg-white px-4 pt-4 pb-4 shadow-sm"
    >
      <button
        type="button"
        class="flex min-h-8 w-full text-sm font-bold text-slate-700"
        :aria-expanded="isSortOpen"
        aria-controls="sort-options"
        @click="isSortOpen = !isSortOpen"
      >
        <span class="inline-flex w-full items-center justify-between gap-2">
          مرتب‌سازی
          <img
            src="/icons/other/arrow.svg"
            alt=""
            class="transition-transform duration-300 ease-out"
            :class="isSortOpen ? 'rotate-180' : 'rotate-0'"
          >
        </span>
      </button>

      <div
        class="grid transition-[grid-template-rows] duration-300 ease-out"
        :class="isSortOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="overflow-hidden">
          <div id="sort-options" class="mt-5 space-y-2 text-sm text-slate-500">
            <label
              v-for="option in sortOptions"
              :key="option.key"
              class="flex min-h-10 cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="products-sort"
                class="h-4 w-4 appearance-none rounded-full border border-[#E20054] bg-white checked:border-[#E20054] checked:bg-[#E20054] checked:shadow-[inset_0_0_0_3px_white]"
                :checked="props.sortBy === option.key && (props.hasExplicitSort || option.key !== 'count-asc')"
                @change="emit('update:sortBy', option.key)"
              >

              <span>{{ option.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <section
      class="w-full overflow-hidden rounded-[24px] bg-white px-4 pt-4 pb-4 shadow-sm"
    >
      <button
        type="button"
        class="flex min-h-8 w-full items-center justify-between text-sm font-bold text-slate-700"
        :aria-expanded="isCategoriesOpen"
        aria-controls="category-options"
        @click="isCategoriesOpen = !isCategoriesOpen"
      >
        <span class="inline-flex w-full items-center justify-between gap-2">
          دسته‌بندی
          <img
            src="/icons/other/arrow.svg"
            alt="arrow-down"
            class="transition-transform duration-300 ease-out"
            :class="isCategoriesOpen ? 'rotate-180' : 'rotate-0'"
          >
        </span>
      </button>

      <div
        class="grid transition-[grid-template-rows] duration-300 ease-out"
        :class="isCategoriesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="overflow-hidden">
          <ul id="category-options" class="mt-5 space-y-2 text-sm text-slate-500">
            <li
              v-for="category in categories"
              :key="category.value"
              class="flex min-h-10 items-center justify-start gap-2"
            >
              <input
                type="checkbox"
                class="h-4 w-4 rounded-[4px] border border-[#E20054] accent-[#E20054]"
                :checked="props.selectedCategories.includes(category.value)"
                :aria-label="`فیلتر دسته‌بندی ${category.label}`"
                @change="toggleCategory(category.value, ($event.target as HTMLInputElement).checked)"
              >
              <span>{{ category.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </aside>
</template>
