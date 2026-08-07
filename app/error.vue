<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const title = computed(() => {
  if (props.error.statusCode === 404)
    return 'صفحه پیدا نشد'
  return 'خطایی رخ داد'
})

const description = computed(() => {
  if (props.error.statusCode === 404)
    return 'آدرس وارد شده معتبر نیست یا صفحه حذف شده است.'
  return 'لطفا چند لحظه دیگر دوباره تلاش کنید.'
})

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div dir="rtl" class="flex min-h-dvh items-center justify-center bg-slate-100 px-4 text-slate-800">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
      <p class="text-sm font-semibold text-rose-600">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-2 text-xl font-bold text-slate-800">
        {{ title }}
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        {{ description }}
      </p>
      <button
        type="button"
        class="mt-6 inline-flex rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
        @click="handleClear"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  </div>
</template>
