<script setup lang="ts">
defineProps<{
  id: string
  error: string | undefined
  label: string
  type?: HTMLInputElement['type']
}>()
const value = defineModel<string>()
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <label :for="id">{{ label }}</label>
    <InputText :id="id" v-model="value" :type :invalid="Boolean(error)" />
    <small :id="`${id}-help`" class="text-red-500">{{ error }}</small>
  </div>
</template>
