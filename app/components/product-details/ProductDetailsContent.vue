<script setup lang="ts">
interface ProductDetailRow {
  id: string
  label: string
  value?: string
  bullets?: string[]
}

const props = defineProps<{
  title: string
  imageSrc: string
}>()

const isViewerOpen = ref(false)

const openViewer = () => {
  isViewerOpen.value = true
}

const closeViewer = () => {
  isViewerOpen.value = false
}

const detailRows: ProductDetailRow[] = [
  { id: 'price', label: 'قیمت', value: '۱۰۰٬۰۰۰ تومان' },
  {
    id: 'summary',
    label: 'توضیحات',
    bullets: [
      'سنسورهای تشخیص موانع: دارای سنسورهای اولتراسونیک برای تشخیص موانع در مسیر درب',
      'توقف خودکار: در صورت تشخیص موانع، درب به صورت خودکار توقف و باز نمی‌شود',
      'کلید اضطراری: دارای کلید اضطراری برای قطع فوری تغذیه و توقف درب',
    ],
  },
  { id: 'category', label: 'دسته بندی', value: 'کشویی' },
  { id: 'count', label: 'تعداد', value: '۱۰' },
  { id: 'rate', label: 'رتبه', value: '۴' },
]

watch(isViewerOpen, (open) => {
  if (!import.meta.client)
    return
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (!import.meta.client)
    return
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="pb-10 sm:pb-[74px]">
    <div class="mx-auto w-full max-w-[1112px]">
      <nav class="flex min-w-0 items-center gap-2 overflow-hidden text-sm text-slate-500" aria-label="breadcrumb">
        <NuxtLink to="/" class="inline-flex shrink-0 items-center">
          <img src="/icons/other/home.svg" alt="خانه" class="h-[18px] w-[18px] shrink-0">
        </NuxtLink>
        <img src="/icons/other/arrow.svg" alt="" class="h-4 w-4 shrink-0 rotate-90">
        <NuxtLink to="/" class="shrink-0 hover:text-slate-700">
          لیست محصولات
        </NuxtLink>
        <img src="/icons/other/arrow.svg" alt="" class="h-4 w-4 shrink-0 rotate-90">
        <p class="min-w-0 truncate text-slate-700">
          {{ props.title }}
        </p>
      </nav>

      <div class="mt-4 sm:mt-6">
        <section class="w-full rounded-[24px] bg-white">
          <div class="flex flex-col items-stretch gap-4 p-4 sm:items-end sm:gap-6 sm:p-6">
            <p class="text-base font-bold text-slate-700 sm:text-lg">
              {{ props.title }}
            </p>
            <div class="relative w-full">
              <button
                type="button"
                class="group absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#00000080] opacity-[0.8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#000000a0] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="نمایش تصویر در حالت بزرگ"
                @click="openViewer"
              >
                <img
                  src="/icons/other/zoom-in.svg"
                  alt="نمایش تصویر در حالت بزرگ"
                  class="h-5 w-5 transform-gpu transition duration-200 group-hover:animate-[icon-shake_0.45s_ease-in-out] group-hover:[filter:brightness(0)_saturate(100%)_invert(22%)_sepia(93%)_saturate(5517%)_hue-rotate(326deg)_brightness(89%)_contrast(113%)]"
                >
              </button>
              <img
                :src="props.imageSrc"
                :alt="props.title"
                class="h-[220px] w-full rounded-[16px] object-contain sm:h-[280px] lg:h-[320px]"
              >
            </div>
          </div>
        </section>

        <section class="mt-4 w-full rounded-[24px] bg-white sm:mt-6">
          <div class="flex flex-col items-start gap-4 p-4 sm:gap-6 sm:p-6">
            <p class="text-base font-bold text-slate-700 sm:text-lg">
              توضیحات محصول
            </p>

            <div class="flex w-full flex-col gap-3">
              <div
                v-for="row in detailRows"
                :key="row.id"
                class="flex flex-col gap-2 sm:flex-row sm:gap-3"
              >
                <div class="flex min-h-12 w-full shrink-0 items-center rounded-[16px] bg-[#F5F7FA] px-4 sm:w-[172px] sm:rounded-r-[16px] sm:rounded-l-[4px] sm:pr-4 sm:pl-0">
                  <p class="text-sm font-bold text-[#57728E]">
                    {{ row.label }}
                  </p>
                </div>

                <div class="flex min-h-12 min-w-0 flex-1 items-center rounded-[16px] bg-[#F5F7FA] px-4 sm:rounded-l-[16px] sm:rounded-r-[4px]">
                  <p v-if="row.value" class="text-sm font-bold text-[#30445B]">
                    {{ row.value }}
                  </p>
                  <ul
                    v-else-if="row.bullets"
                    class="w-full list-disc gap-2 space-y-2 py-4 pr-6 text-sm font-bold text-[#30445B]"
                  >
                    <li v-for="bullet in row.bullets" :key="bullet">
                      {{ bullet }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div
    v-if="isViewerOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    :aria-label="`نمای بزرگ ${props.title}`"
    @click.self="closeViewer"
  >
    <div class="relative w-full max-w-5xl">
      <button
        type="button"
        class="absolute top-3 right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
        aria-label="بستن نمای تصویر"
        @click="closeViewer"
      >
        ×
      </button>
      <img :src="props.imageSrc" :alt="props.title" class="max-h-[85dvh] w-full rounded-2xl bg-white object-contain">
    </div>
  </div>
</template>

<style scoped>
@keyframes icon-shake {
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-10deg) scale(1.05); }
  50% { transform: rotate(10deg) scale(1.05); }
  75% { transform: rotate(-6deg) scale(1.03); }
  100% { transform: rotate(0deg) scale(1); }
}
</style>
