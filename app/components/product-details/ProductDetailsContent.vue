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
</script>

<template>
  <div class="pb-[74px]">
    <div class="mx-auto w-full max-w-[1112px] px-4">
      <nav class="flex items-center gap-2 text-sm text-slate-500" aria-label="breadcrumb">
        <NuxtLink to="/" class="inline-flex items-center">
          <img src="/icons/home.svg" alt="خانه" class="h-[18px] w-[18px] shrink-0">
        </NuxtLink>
        <img src="/icons/arrow.svg" alt="" class="h-4 w-4 shrink-0 rotate-90">
        <NuxtLink to="/" class="hover:text-slate-700">
          لیست محصولات
        </NuxtLink>
        <img src="/icons/arrow.svg" alt="" class="h-4 w-4 shrink-0 rotate-90">
        <p class="truncate text-slate-700">
          {{ props.title }}
        </p>
      </nav>

      <div class="mt-6">
        <section class="w-full rounded-[24px] bg-white">
          <div class="flex flex-col items-end gap-6 p-6">
            <p class="text-lg font-bold text-slate-700">
              {{ props.title }}
            </p>
            <div class="relative w-full">
              <button
                type="button"
                class="group absolute top-3 right-3 z-10 inline-flex h-[40px] w-[40px] items-center justify-center rounded-[13px] bg-[#00000080] opacity-[0.8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#000000a0] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="نمایش تصویر در حالت بزرگ"
                @click="openViewer"
              >
                <img
                  src="/icons/zoom-in.svg"
                  alt="نمایش تصویر در حالت بزرگ"
                  class="h-[20px] w-[20px] transform-gpu transition duration-200 group-hover:animate-[icon-shake_0.45s_ease-in-out] group-hover:[filter:brightness(0)_saturate(100%)_invert(22%)_sepia(93%)_saturate(5517%)_hue-rotate(326deg)_brightness(89%)_contrast(113%)]"
                >
              </button>
              <img :src="props.imageSrc" :alt="props.title" class="h-[320px] w-full rounded-[16px] object-contain">
            </div>
          </div>
        </section>

        <section class="mt-6 w-full rounded-[24px] bg-white">
          <div class="flex flex-col items-start gap-6 p-6">
            <p class="text-lg font-bold text-slate-700">
              توضیحات محصول
            </p>

            <div class="flex w-full flex-col gap-3">
              <div
                v-for="row in detailRows"
                :key="row.id"
                class="flex gap-3"
              >
                <div class="flex min-h-[48px] w-[172px] items-center rounded-r-[16px] rounded-l-[4px] bg-[#F5F7FA] pr-4">
                  <p class="text-sm font-bold text-[#57728E]">
                    {{ row.label }}
                  </p>
                </div>

                <div class="flex min-h-[48px] flex-1 items-center rounded-l-[16px] rounded-r-[4px] bg-[#F5F7FA] pl-4 pr-4">
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
        class="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
        aria-label="بستن نمای تصویر"
        @click="closeViewer"
      >
        ×
      </button>
      <img :src="props.imageSrc" :alt="props.title" class="max-h-[85vh] w-full rounded-2xl bg-white object-contain">
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
