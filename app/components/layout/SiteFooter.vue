<template>
  <footer class="mt-8 overflow-hidden rounded-t-[24px] bg-white">
    <div class="mx-auto flex w-full max-w-7xl flex-col justify-between gap-10 px-4 pt-10 pb-8 sm:px-8 lg:min-h-[264px] lg:gap-0 lg:pt-12 lg:pb-7">
      <p class="order-last text-sm text-slate-500 lg:order-first lg:mt-32">
        هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
      </p>
      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-[180px]">
        <div>
          <h2 class="mb-4 text-base font-bold text-slate-800">دسترسی سریع</h2>
          <ul class="space-y-3 text-sm leading-7 text-slate-500">
            <li>درباره ما</li>
            <li>بلاگ</li>
            <li>تماس با ما</li>
            <li>خدمات پس از فروش</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4 text-base font-bold text-slate-800">راهنمای سایت</h2>
          <ul class="space-y-3 text-sm leading-7 text-slate-500">
            <li>قوانین و مقررات</li>
            <li>دریافت مشاوره</li>
            <li>انتقادات و پیشنهادات</li>
          </ul>
        </div>

        <div class="sm:col-span-2 md:col-span-1">
          <h2 class="mb-4 text-base font-bold text-slate-800">شبکه‌های اجتماعی</h2>
          <ul class="flex flex-col space-y-3 text-sm leading-7 text-slate-500">
            <li class="inline-flex items-center gap-2">
              <img src="/icons/telegram.svg" alt="تلگرام">
              تلگرام
            </li>
            <li class="inline-flex items-center gap-2">
              <img src="/icons/instagram.svg" alt="اینستاگرام">
              اینستاگرام
            </li>
            <li class="inline-flex items-center gap-2">
              <img src="/icons/linkedin.svg" alt="لینکدین">
              لینکدین
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
          <li class="h-6 w-6 rounded-full">
            <img src="/icons/instagram-red.svg" alt="image">
          </li>
          <li class="h-6 w-6 rounded-full">
            <img src="/icons/telegram-red.svg" alt="image">
          </li>
          <li class="h-6 w-6 rounded-full">
            <img src="/icons/linkedin-red.svg" alt="image">
          </li>
          <li class="h-6 w-6 rounded-full">
            <img src="/icons/twitter-red.svg" alt="image">
          </li>
          <li class="h-6 w-6 rounded-full">
            <img src="/icons/youtube-red.svg" alt="image">
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
