<script setup lang="ts">
import type { ProductFilterChip } from '#shared/types/product'

const props = defineProps<{
  chips: ProductFilterChip[]
  totalCount: number
}>()

const emit = defineEmits<{
  removeChip: [chip: ProductFilterChip]
  clearAll: []
}>()

const iconForChip = (kind: ProductFilterChip['kind']) => {
  if (kind === 'search')
    return '/icons/other/magnifier.svg'

  return '/icons/other/sort-down.svg'
}
</script>

<template>
  <section class="mb-4 flex min-h-16 w-full max-w-[822px] flex-col gap-3 rounded-3xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
    <p class="pr-1 text-sm text-[#253343] sm:pr-3">
      فیلترهای اعمال شده
    </p>

    <div class="flex flex-wrap items-center gap-2 sm:justify-end">
      <button
        v-for="chip in props.chips"
        :key="chip.id"
        type="button"
        class="flex h-8 max-w-full items-center gap-2 rounded-[16px] bg-[#FCE5EE] px-3 text-xs font-semibold text-[#253343]"
        :aria-label="`حذف فیلتر ${chip.label}`"
        @click="emit('removeChip', chip)"
      >
        <img :src="iconForChip(chip.kind)" alt="" class="h-4 w-4 shrink-0">
        <span class="max-w-36 truncate">{{ chip.label }}</span>
        <img src="/icons/other/close.svg" alt="" class="h-4 w-4 shrink-0">
      </button>

      <button
        v-if="props.chips.length"
        type="button"
        class="h-8 rounded-[16px] border border-slate-200 px-3 text-xs font-semibold text-slate-600"
        @click="emit('clearAll')"
      >
        حذف همه
      </button>
    </div>
  </section>
</template>
