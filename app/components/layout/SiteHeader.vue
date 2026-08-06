<script setup lang="ts">
import { defineComponent, h } from 'vue'

const Category2Icon = defineComponent({
  name: 'Category2Icon',
  setup() {
    return () => h('img', { src: '/icons/category-2.svg', alt: '', class: 'h-4 w-4 shrink-0' })
  },
})

const BookIcon = defineComponent({
  name: 'BookIcon',
  setup() {
    return () => h('img', { src: '/icons/book.svg', alt: '', class: 'h-4 w-4 shrink-0' })
  },
})

const MessageQuestionIcon = defineComponent({
  name: 'MessageQuestionIcon',
  setup() {
    return () => h('img', { src: '/icons/message-question.svg', alt: '', class: 'h-4 w-4 shrink-0' })
  },
})

const PhoneCallIcon = defineComponent({
  name: 'PhoneCallIcon',
  setup() {
    return () => h('img', { src: '/icons/phone-call.svg', alt: '', class: 'h-4 w-4 shrink-0' })
  },
})

const LeftPhoneCallIcon = defineComponent({
  name: 'LeftPhoneCallIcon',
  setup() {
    return () => h('img', { src: '/icons/left-phone-call.svg', alt: '', class: 'h-4 w-4 shrink-0' })
  },
})

const navItems = [
  {
    label: 'لیست محصولات',
    active: true,
    icon: Category2Icon,
  },
  {
    label: 'درخواست مشاوره',
    active: false,
    icon: BookIcon,
  },
  {
    label: 'سوالات متداول',
    active: false,
    icon: MessageQuestionIcon,
  },
  {
    label: 'تماس با ما',
    active: false,
    icon: PhoneCallIcon,
  },
] as Array<{ label: string, active: boolean, icon: ReturnType<typeof defineComponent> }>
</script>

<template>
  <header class="mb-4 h-[120px] w-full rounded-b-[28px] bg-white shadow-[0_3px_16px_rgba(15,23,42,0.06)]">
    <div class="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4">
      <button
        type="button"
        class="absolute left-4 inline-flex h-[40px] w-[107px] items-center justify-center gap-2 rounded-[16px] bg-[#E20054] px-4 py-3 text-center text-[14px] font-bold leading-[16px] text-white [font-family:'YekanBakhCustom']"
      >
        تماس
        <component :is="LeftPhoneCallIcon" />
      </button>

      <nav class="flex items-center gap-6 text-[13px] text-slate-700 sm:gap-7">
        <a
          v-for="item in navItems"
          :key="item.label"
          href="#"
          class="relative inline-flex items-center gap-1.5 transition-colors"
          :class="item.active ? 'text-[#E20054]' : 'text-slate-600 hover:text-slate-800'"
        >
          <component :is="item.icon" />
          <span>{{ item.label }}</span>
          <span
            v-if="item.active"
            class="absolute -bottom-3.5 right-1/2 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-[#E20054] shadow-[0_0_8px_2px_rgba(226,0,84,0.55)]"
          />
        </a>
      </nav>
    </div>
  </header>
</template>
