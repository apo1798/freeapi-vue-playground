<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { useUserStore } from './stores/user'

useToastStore()
useUserStore()
</script>

<template>
  <AppLayout>
    <RouterView />
    <Toast />
  </AppLayout>
</template>
