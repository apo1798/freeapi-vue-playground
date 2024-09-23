import { defineStore } from 'pinia'
import type { ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { reactive, watch } from 'vue'

export const toastStore = reactive<{ toasts: ToastMessageOptions[] }>({
  toasts: []
})

// https://stackoverflow.com/questions/77855947/use-a-vue-service-outside-of-a-vue-component
export const useToastStore = defineStore('toast', () => {
  const toast = useToast()
  watch(
    () => toastStore.toasts.length,
    () => {
      const toasts = toastStore.toasts
      toasts.length && toast.add(toasts[toasts.length - 1])
    }
  )
  return { toastStore }
})
