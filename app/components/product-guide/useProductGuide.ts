import { productGuideSteps, type ProductGuideStep } from './steps'

const DESKTOP_QUERY = '(min-width: 1024px)'

export function useProductGuide() {
  const isOpen = ref(false)
  const stepIndex = ref(0)
  const targetRect = ref<DOMRect | null>(null)
  const isDesktop = ref(false)

  const steps = productGuideSteps
  const currentStep = computed<ProductGuideStep | null>(() => steps[stepIndex.value] ?? null)
  const isLastStep = computed(() => stepIndex.value >= steps.length - 1)

  let mediaQuery: MediaQueryList | null = null

  const syncDesktop = () => {
    isDesktop.value = mediaQuery?.matches ?? false
    if (!isDesktop.value && isOpen.value)
      close()
  }

  const measureTarget = () => {
    if (!import.meta.client || !currentStep.value)
      return

    const el = document.querySelector<HTMLElement>(`[data-guide="${currentStep.value.target}"]`)
    if (!el) {
      targetRect.value = null
      return
    }

    targetRect.value = el.getBoundingClientRect()
  }

  const scrollTargetIntoView = async () => {
    if (!import.meta.client || !currentStep.value)
      return

    const el = document.querySelector<HTMLElement>(`[data-guide="${currentStep.value.target}"]`)
    if (!el)
      return

    const rect = el.getBoundingClientRect()
    const desiredTop = 120
    const delta = rect.top - desiredTop
    if (Math.abs(delta) > 8)
      window.scrollBy({ top: delta, behavior: 'smooth' })

    await new Promise(resolve => setTimeout(resolve, 280))
    measureTarget()
  }

  const open = async () => {
    if (!isDesktop.value)
      return

    stepIndex.value = 0
    await nextTick()
    await scrollTargetIntoView()
    isOpen.value = true
    await nextTick()
    measureTarget()
  }

  const close = () => {
    isOpen.value = false
    stepIndex.value = 0
    targetRect.value = null
  }

  const next = async () => {
    if (isLastStep.value) {
      close()
      return
    }

    stepIndex.value += 1
    await nextTick()
    await scrollTargetIntoView()
  }

  const prev = async () => {
    if (stepIndex.value <= 0)
      return

    stepIndex.value -= 1
    await nextTick()
    await scrollTargetIntoView()
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value)
      return

    if (event.key === 'Escape')
      close()
    else if (event.key === 'ArrowRight')
      void next()
    else if (event.key === 'ArrowLeft')
      void prev()
  }

  onMounted(() => {
    if (!import.meta.client)
      return

    mediaQuery = window.matchMedia(DESKTOP_QUERY)
    syncDesktop()
    mediaQuery.addEventListener('change', syncDesktop)
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', measureTarget)
    window.addEventListener('scroll', measureTarget, { passive: true })
  })

  onBeforeUnmount(() => {
    if (!import.meta.client)
      return

    mediaQuery?.removeEventListener('change', syncDesktop)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', measureTarget)
    window.removeEventListener('scroll', measureTarget)
    document.body.style.overflow = ''
  })

  watch(isOpen, (open) => {
    if (!import.meta.client)
      return
    document.body.style.overflow = open ? 'hidden' : ''
  })

  return {
    isOpen,
    isDesktop,
    steps,
    stepIndex,
    currentStep,
    isLastStep,
    targetRect,
    open,
    close,
    next,
    prev,
  }
}
