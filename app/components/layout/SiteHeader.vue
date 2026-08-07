<script setup lang="ts">
const githubUrl = 'https://github.com/AmirSa12'

const navItems = [
  {
    label: 'لیست محصولات',
    active: true,
    icon: '/icons/other/category-2.svg',
  },
  {
    label: 'درخواست مشاوره',
    active: false,
    icon: '/icons/other/book.svg',
  },
  {
    label: 'سوالات متداول',
    active: false,
    icon: '/icons/other/message-question.svg',
  },
  {
    label: 'تماس با ما',
    active: false,
    icon: '/icons/other/phone-call.svg',
  },
] as const

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleViewportChange = () => {
  if (window.matchMedia('(min-width: 1024px)').matches)
    closeMobileMenu()
}

watch(isMobileMenuOpen, (open) => {
  if (!import.meta.client)
    return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('resize', handleViewportChange)
})

onBeforeUnmount(() => {
  if (!import.meta.client)
    return
  window.removeEventListener('resize', handleViewportChange)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="relative z-40 mb-4 w-full rounded-b-[28px] bg-white shadow-[0_3px_16px_rgba(15,23,42,0.06)]">
    <div class="relative mx-auto flex min-h-16 w-full max-w-[1030px] items-center justify-between gap-3 px-4 py-3 lg:h-[120px] lg:justify-center lg:py-0">
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="site-mobile-nav"
        aria-label="منوی سایت"
        @click="toggleMobileMenu"
      >
        <span class="sr-only">منوی سایت</span>
        <svg v-if="!isMobileMenuOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
        </svg>
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>

      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex h-10 min-w-[107px] items-center justify-center gap-2 rounded-[16px] bg-[#E20054] px-4 py-3 text-center text-[14px] font-bold leading-[16px] text-white transition-colors hover:bg-[#c4004a] [font-family:'YekanBakhCustom'] lg:absolute lg:left-4"
      >
        تماس
        <span
          class="header-icon h-4 w-4 shrink-0 bg-white"
          :style="{
            WebkitMaskImage: 'url(/icons/other/left-phone-call.svg)',
            maskImage: 'url(/icons/other/left-phone-call.svg)',
          }"
          aria-hidden="true"
        />
      </a>

      <nav class="hidden items-center gap-6 text-[13px] text-slate-700 sm:gap-7 lg:flex">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-flex items-center gap-1.5 transition-colors"
          :class="item.active ? 'text-[#E20054]' : 'text-slate-600 hover:text-[#E20054]'"
        >
          <span
            class="header-icon h-4 w-4 shrink-0 bg-current transition-colors"
            :style="{
              WebkitMaskImage: `url(${item.icon})`,
              maskImage: `url(${item.icon})`,
            }"
            aria-hidden="true"
          />
          <span>{{ item.label }}</span>
          <span
            v-if="item.active"
            class="absolute -bottom-3.5 right-1/2 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-[#E20054] shadow-[0_0_8px_2px_rgba(226,0,84,0.55)]"
          />
        </a>
      </nav>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
      @click="closeMobileMenu"
    />

    <nav
      id="site-mobile-nav"
      class="absolute inset-x-0 top-full z-40 origin-top rounded-b-2xl border-t border-slate-100 bg-white px-4 py-3 shadow-lg transition lg:hidden"
      :class="isMobileMenuOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'"
      :aria-hidden="!isMobileMenuOpen"
    >
      <ul class="flex flex-col gap-1 text-sm text-slate-700">
        <li v-for="item in navItems" :key="item.label">
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 transition-colors"
            :class="item.active ? 'bg-[#FCE5EE] text-[#E20054]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#E20054]'"
            @click="closeMobileMenu"
          >
            <span
              class="header-icon h-4 w-4 shrink-0 bg-current transition-colors"
              :style="{
                WebkitMaskImage: `url(${item.icon})`,
                maskImage: `url(${item.icon})`,
              }"
              aria-hidden="true"
            />
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-icon {
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
