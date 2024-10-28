<script setup lang="ts">
const emit = defineEmits<{
  // buttonClick: [value: number]
  // submit: [payload: { email: string; password: string }],
  (e: 'buttonClick2', value: number): void
  (e: 'submit2', payload: { email: string; password: string }): void
}>()
const buttonClick = () => {
  emit('buttonClick2', 2)
  emit('submit2', { email: '1', password: '2' })
}
</script>

<template>
  <div>
    <button @click="buttonClick"></button>
  </div>
</template>
