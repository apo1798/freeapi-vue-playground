<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/shared/AppHeader.vue'
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'

const toast = useToastStore()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { logout } = userStore

const logoutHandler = async () => {
  await logout()
  toast.message({ detail: '登出成功' })
  router.push('/')
}
</script>

<template>
  <main class="container my-10 flex flex-col gap-2">
    <AppHeader level="h1">使用者資訊</AppHeader>
    <AppHeader level="h2">Hi {{ user?.username }}</AppHeader>
    <pre class="rounded bg-gray-100 p-2 shadow-lg dark:bg-gray-900">{{
      JSON.stringify(user, null, 2)
    }}</pre>
    <div>
      <Button @click="logoutHandler">登出</Button>
    </div>
  </main>
</template>
