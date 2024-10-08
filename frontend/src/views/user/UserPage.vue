<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import AppHeading from '@/components/shared/AppHeading.vue'

const router = useRouter()
// router.push('/account/login')
const { user } = useUserStore()
</script>

<template>
  <!-- <h1>使用者資訊</h1> -->
  <h2>Hi {{ user?.username }}</h2>
  <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  <AppHeading level="h3" class="asd">123</AppHeading>
  <AppHeading level="h1">222</AppHeading>
</template>
