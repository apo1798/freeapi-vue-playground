<script setup lang="ts">
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { onMounted, useSlots } from 'vue'

const { level = 'h2', class: className } = defineProps<{
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  class?: string
}>()

// Base classes for each heading level using Tailwind
const baseClasses = {
  h1: 'text-4xl font-extrabold tracking-tight',
  h2: 'text-3xl font-bold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-medium tracking-tight',
  h5: 'text-lg font-medium tracking-tight',
  h6: 'text-base font-medium tracking-tight'
}

// Determine the final class string
const finalClass = twMerge(baseClasses[level], clsx(className))

onMounted(() => {
  if (!useSlots().default) {
    throw new Error('The default slot is required but was not provided.')
  }
})
</script>

<template>
  <component :is="level" :class="finalClass"><slot /></component>
</template>
