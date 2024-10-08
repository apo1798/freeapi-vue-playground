import { toastStore } from '@/stores/toast'
import ky from 'ky'
const backendUrl = 'http://localhost:8080/api/v1'

export const customKy = ky.create({
  credentials: 'include',
  prefixUrl: backendUrl,
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error
        if (response && response.body) {
          const data = await response.json<{ message?: string }>()
          toastStore.toasts.push({
            severity: 'error',
            summary: 'Error Message',
            detail: data?.message,
            life: 3000
          })
        }

        return error
      }
    ]
  }
})
