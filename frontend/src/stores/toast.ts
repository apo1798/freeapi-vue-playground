import { defineStore } from 'pinia'
import type { ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { reactive, watch } from 'vue'

const defaultLife = 3000

export const toastStore = reactive<{ toasts: ToastMessageOptions[] }>({
  toasts: []
})

// (V) https://stackoverflow.com/questions/77855947/use-a-vue-service-outside-of-a-vue-component
// https://stackoverflow.com/questions/70635606/how-to-create-reusable-toastservice-with-primevue-toast
export const useToastStore = defineStore('toast', () => {
  const toast = useToast()
  watch(
    () => toastStore.toasts.length,
    () => {
      const toasts = toastStore.toasts
      toasts.length && toast.add(toasts[toasts.length - 1])
    }
  )
  return {
    toastStore,
    message: (options: ToastMessageOptions) => {
      toastStore.toasts.push({
        severity: 'info',
        life: defaultLife,
        styleClass: 'empty:hidden',
        ...options
      })
    }
  }
})
