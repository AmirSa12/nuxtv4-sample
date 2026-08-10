<script setup lang="ts">
import type { ProductGuideStep } from './steps'

const props = defineProps<{
  step: ProductGuideStep
  targetRect: DOMRect | null
}>()

const emit = defineEmits<{
  close: []
}>()

const PAD = 12

const cutoutStyle = computed(() => {
  const rect = props.targetRect
  if (!rect) {
    return {
      top: '50%',
      left: '50%',
      width: '0px',
      height: '0px',
      opacity: '0',
    }
  }

  return {
    top: `${Math.max(8, rect.top - PAD)}px`,
    left: `${Math.max(8, rect.left - PAD)}px`,
    width: `${rect.width + PAD * 2}px`,
    height: `${rect.height + PAD * 2}px`,
    opacity: '1',
  }
})

const islandStyle = computed(() => {
  const rect = props.targetRect
  if (!rect) {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '320px',
    }
  }

  const inset = 20
  const maxWidth = Math.min(340, Math.max(220, rect.width - inset * 2))

  return {
    top: `${rect.top + inset}px`,
    left: `${rect.left + rect.width / 2}px`,
    transform: 'translate(-50%, 0)',
    maxWidth: `${maxWidth}px`,
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      class="product-guide-overlay fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`guide-title-${step.id}`"
    >
      <button
        type="button"
        class="absolute inset-0 cursor-default bg-transparent"
        aria-label="بستن راهنما"
        @click="emit('close')"
      />

      <div
        class="product-guide-cutout pointer-events-none absolute rounded-[28px] transition-all duration-300 ease-out"
        :style="cutoutStyle"
        aria-hidden="true"
      />

      <aside
        class="product-guide-island absolute z-[61] flex w-full flex-col gap-3 rounded-[22px] bg-[#0F172A] px-4 py-3 text-white shadow-[0_12px_40px_rgba(15,23,42,0.35)]"
        :style="islandStyle"
        dir="rtl"
      >
        <div class="min-w-0">
          <h2
            :id="`guide-title-${step.id}`"
            class="text-[13px] font-bold leading-none text-white"
          >
            {{ step.title }}
          </h2>
          <p class="mt-1.5 text-[12px] leading-5 text-slate-300">
            {{ step.body }}
          </p>
        </div>

        <button
          type="button"
          class="w-full rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-slate-900 transition hover:bg-slate-100"
          @click="emit('close')"
        >
          متوجه شدم
        </button>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.product-guide-cutout {
  box-shadow: 0 0 0 9999px rgb(15 23 42 / 0.62);
  outline: 2px solid rgb(226 0 84 / 0.55);
}

.product-guide-island {
  animation: island-in 0.28s ease-out;
}

@keyframes island-in {
  from {
    opacity: 0;
    transform: translate(-50%, -8px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}
</style>
