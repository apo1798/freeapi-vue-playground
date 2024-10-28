<script setup lang="ts">
import Select, { type SelectProps } from 'primevue/select'

const props = defineProps<SelectProps & { id: string; label?: string; floatLabel?: boolean }>()

const value = defineModel<string>()
</script>

<template>
  <FloatLabel v-if="props.label && floatLabel" class="mt-6">
    <Select v-bind="props" v-model="value" class="w-full" />
    <label :for="props.id">{{ props.label }}</label>
  </FloatLabel>
  <div v-else>
    <div class="mb-1">
      <label :for="props.id">{{ props.label }}</label>
    </div>
    <Select class="w-full" v-bind="props" v-model="value"></Select>
  </div>
</template>
