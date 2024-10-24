import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { customKy } from '@/utils/ky'
import { z } from 'zod'

const isLoggedInKey = 'isLoggedIn'

const userSchema = z
  .object({
    _id: z.string(),
    avatar: z.object({ url: z.string() }).passthrough(),
    username: z.string(),
    email: z.string(),
    role: z.enum(['ADMIN', 'USER']),
    isEmailVerified: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .passthrough()

export const useUserStore = defineStore('user', () => {
  // as we not storage access and refresh token, this is an idicator whether we can call the `/current-user` api to get user data or not
  const isLoggedIn = ref<boolean>(localStorage.getItem(isLoggedInKey) === 'true')
  const user = ref<z.infer<typeof userSchema> | undefined>(undefined)

  const login = async (value: { username: string; password: string }) => {
    const res = await customKy
      .post('users/login', {
        json: value
      })
      .json()
    await checkLoginStatus()

    localStorage.setItem(isLoggedInKey, 'true')
    isLoggedIn.value = true

    return res
  }

  const logout = async () => {
    localStorage.removeItem(isLoggedInKey)
    await customKy.post('user/logout')
    isLoggedIn.value = false
  }

  const checkLoginStatus = async () => {
    try {
      const res = await customKy.get('users/current-user').json()
      const result = z.object({ data: userSchema }).safeParse(res)
      if (result.success) {
        user.value = result.data.data
      }
    } catch (e) {
      localStorage.removeItem(isLoggedInKey)
    }
  }

  onMounted(() => {
    if (isLoggedIn.value) {
      checkLoginStatus()
    }
  })

  return {
    isLoggedIn,
    user,
    logout,
    login
  }
})
