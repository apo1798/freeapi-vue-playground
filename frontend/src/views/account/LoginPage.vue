<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { customZod } from '@/utils/zod'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()
const toast = useToastStore()
const user = useUserStore()

const schema = customZod.object({
  username: z.string(),
  password: z.string()
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [username] = defineField('username')
const [password] = defineField('password')

const { mutate: login } = useMutation({
  mutationKey: ['register'],
  mutationFn: async (value: z.infer<typeof schema>) => {
    const res = await user.login(value)
    toast.message({ detail: '登入成功' })
    router.push('/')
    return res
  }
})

const onSubmit = handleSubmit((values) => {
  login(values)
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
      <div>
        <Button icon="pi pi-sign-in" type="submit" class="mb-4 w-full" label="登入 Fat4Fun" />
      </div>
      <div class="flex flex-col gap-6 border-t pt-4">
        <div class="flex flex-col gap-2">
          <h3 class="text-center text-xl font-bold">尚未註冊？</h3>
          <div class="mt-4 flex gap-2">
            <Button
              severity="info"
              icon="pi pi-user"
              as="router-link"
              :to="{ name: 'register' }"
              class="w-full"
              label="註冊帳號"
            />
            <!-- <Button
            severity="info"
            icon="pi pi-question-circle"
            as="router-link"
            :to="{ name: 'forgetPassword' }"
            class="w-full"
            label="忘記密碼"
          /> -->
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
