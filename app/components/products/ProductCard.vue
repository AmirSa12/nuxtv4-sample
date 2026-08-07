<script setup lang="ts">
import type { ProductCardPreview } from '#shared/types/product'

defineProps<{
  product: ProductCardPreview
}>()
</script>

<template>
  <article class="flex h-full min-h-[296px] w-full flex-col rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
    <div class="h-[170px] w-full shrink-0 overflow-hidden rounded-[18px]">
      <img
        :src="product.image"
        :alt="product.title"
        class="h-full w-full object-contain object-center"
        loading="lazy"
      >
    </div>

    <div class="mt-3 min-h-[72px] overflow-hidden">
      <h3 dir="ltr" class="line-clamp-3 text-left text-[14px] font-bold leading-[24px] tracking-[0] text-slate-800">
        {{ product.title }}
      </h3>
    </div>

    <NuxtLink
      :to="`/products/${product.id}`"
      class="group mt-auto flex h-10 w-full shrink-0 items-center justify-center gap-1 self-center rounded-[16px] border-[1.5px] border-slate-200 bg-white px-4 py-3 text-center text-[14px] font-bold leading-[16px] tracking-[0] text-rose-500 transition-colors duration-200 hover:border-[#E20054] hover:bg-[#E20054] hover:text-white"
    >
      مشاهده جزئیات
      <span
        aria-hidden="true"
        class="inline-block h-4 w-4 shrink-0 rotate-90 bg-current transition-transform duration-200 ease-out group-hover:-translate-x-1"
        style="-webkit-mask: url(/icons/other/arrow.svg) center / contain no-repeat; mask: url(/icons/other/arrow.svg) center / contain no-repeat;"
      />
    </NuxtLink>
  </article>
</template>
