<template>
  <footer class="mt-8 overflow-hidden rounded-t-[24px] bg-white">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-10 pb-8 sm:px-8 lg:min-h-[264px] lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pt-12 lg:pb-7">
      <p class="order-last text-sm text-slate-500 lg:order-first lg:mt-32 lg:ml-16 lg:shrink-0 xl:ml-28">
        هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
      </p>

      <div class="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:max-w-[900px] lg:gap-[180px]">
        <div>
          <h2 class="mb-4 text-base font-bold text-slate-800">دسترسی سریع</h2>
          <ul class="space-y-3 text-sm leading-7 text-slate-500">
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">درباره ما</a>
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">بلاگ</a>
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">تماس با ما</a>
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">خدمات پس از فروش</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4 text-base font-bold text-slate-800">راهنمای سایت</h2>
          <ul class="space-y-3 text-sm leading-7 text-slate-500">
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">قوانین و مقررات</a>
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">دریافت مشاوره</a>
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-[#E20054]">انتقادات و پیشنهادات</a>
            </li>
          </ul>
        </div>

        <div class="sm:col-span-2 md:col-span-1">
          <h2 class="mb-4 text-base font-bold text-slate-800">شبکه‌های اجتماعی</h2>
          <ul class="flex flex-col space-y-3 text-sm leading-7 text-slate-500">
            <li>
              <a
                href="https://github.com/AmirSa12"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 transition-colors hover:text-[#E20054]"
              >
                <img src="/icons/social/telegram.svg" alt="تلگرام">
                تلگرام
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AmirSa12"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 transition-colors hover:text-[#E20054]"
              >
                <img src="/icons/social/instagram.svg" alt="اینستاگرام">
                اینستاگرام
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AmirSa12"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 transition-colors hover:text-[#E20054]"
              >
                <img src="/icons/social/linkedin.svg" alt="لینکدین">
                لینکدین
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="relative flex min-h-[152px] w-full flex-col items-center justify-center gap-6 rounded-t-[16px] bg-[#F8F9FC] px-4 py-6 sm:px-8 lg:flex-row lg:justify-center">
      <div class="flex flex-row flex-wrap items-center justify-center gap-4 lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2 xl:left-20 xl:gap-8">
        <img src="/imgs/frame-1.png" alt="image" class="h-auto max-h-16 w-auto max-w-[120px] object-contain sm:max-h-20 sm:max-w-none">
        <img src="/imgs/frame-2.png" alt="image" class="h-auto max-h-16 w-auto max-w-[120px] object-contain sm:max-h-20 sm:max-w-none">
      </div>

      <div class="mx-auto flex w-full max-w-[390px] flex-col items-center justify-center">
        <p class="text-center text-sm text-slate-500">
          تمامی حقوق مادی و معنوی این وبسایت متعلق به می‌باشد و هر گونه کپی برداری پیگرد قانونی دارد.
        </p>
        <ul class="mt-4 flex flex-row gap-4">
          <li
            v-for="icon in socialIcons"
            :key="icon.src"
            class="h-6 w-6 rounded-full"
          >
            <a
              href="https://github.com/AmirSa12"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon block h-full w-full bg-[#F180A9] transition-colors hover:bg-[#E20054]"
              :style="{
                WebkitMaskImage: `url(${icon.src})`,
                maskImage: `url(${icon.src})`,
              }"
              :aria-label="icon.label"
            />
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialIcons = [
  { src: '/icons/social/instagram-red.svg', label: 'اینستاگرام' },
  { src: '/icons/social/telegram-red.svg', label: 'تلگرام' },
  { src: '/icons/social/linkedin-red.svg', label: 'لینکدین' },
  { src: '/icons/social/twitter-red.svg', label: 'توییتر' },
  { src: '/icons/social/youtube-red.svg', label: 'یوتیوب' },
] as const
</script>

<style scoped>
.social-icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-mode: alpha;
  mask-mode: alpha;
}
</style>
