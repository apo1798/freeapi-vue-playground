<script setup lang="ts">
import TestComp from './TestComp.vue'

const emit = defineEmits({
  submit(payload: { email: string; password: string }) {
    // return `true` or `false` to indicate
    // validation pass / fail
    return true
  }
})

const aaa = () => {
  emit('submit', { email: '1,', password: '2' })
}
</script>

<template>
  <div></div>

  <TestComp
    @button-click="
      (num) => {
        console.log(num)
      }
    "
  />
</template>
