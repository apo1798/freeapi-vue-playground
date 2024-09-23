<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
useToastStore()
</script>

<template>
  <AppLayout>
    <RouterView />
    <Toast />
  </AppLayout>
</template>
