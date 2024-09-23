<script setup lang="ts">
import { customKy } from '@/utils/ky'
import { customZod } from '@/utils/zod'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()
const toast = useToast()

const schema = customZod.object({
  username: z.string(),
  password: z.string()
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [username] = defineField('username')
const [password] = defineField('password')

const { mutate } = useMutation({
  mutationKey: ['register'],
  mutationFn: async (value: z.infer<typeof schema>) => {
    const res = await customKy.post('users/login', { json: value }).json()

    toast.add({ summary: '登入成功' })
    router.push('/')

    return res
  }
})
const onSubmit = handleSubmit((values) => {
  console.log(values)
  mutate(values)
})
</script>

<template>
  <section class="container">
    <form @submit="onSubmit" class="mx-auto mb-20 mt-10 max-w-sm space-y-8">
      <h1 class="text-center text-3xl font-bold">登入 Fat4Fun 帳號</h1>
      <div class="flex flex-col gap-4">
        <FormInput id="username" label="使用者名稱" v-model="username" :error="errors.username" />
        <FormInput
          id="password"
          label="密碼"
          v-model="password"
          :error="errors.password"
          type="password"
        />
      </div>
      <div class="mt-12 space-y-6">
        <Button icon="pi pi-sign-in" type="submit" class="w-full" label="登入 Fat4Fun" />
        <div class="flex gap-2">
          <Button
            severity="info"
            icon="pi pi-user"
            as="router-link"
            :to="{ name: 'register' }"
            class="w-full"
            label="註冊帳號"
          />
          <Button
            severity="info"
            icon="pi pi-question-circle"
            as="router-link"
            :to="{ name: 'forgetPassword' }"
            class="w-full"
            label="忘記密碼"
          />
        </div>
      </div>
    </form>
  </section>
</template>
