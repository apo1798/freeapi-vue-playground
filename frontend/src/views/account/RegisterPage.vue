<script setup lang="ts">
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import { useToastStore } from '@/stores/toast'
import { customKy } from '@/utils/ky'
import { customZod } from '@/utils/zod'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()
const toast = useToastStore()

const schema = customZod
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
    role: z.enum(['ADMIN', 'USER'])
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '密碼不一致 ><',
    path: ['passwordConfirm']
  })

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [email] = defineField('email')
const [username] = defineField('username')
const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')
const [role] = defineField('role')

const { mutate } = useMutation({
  mutationKey: ['register'],
  mutationFn: async (value: Omit<z.infer<typeof schema>, 'passwordConfirm'>) => {
    const res = await customKy.post('users/register', { json: value }).json()
    toast.message({ summary: '註冊成功' })
    router.push('/account/login')
    return res
  }
})
const onSubmit = handleSubmit((values) => {
  const { passwordConfirm: _, ...formValues } = values
  mutate(formValues)
})
</script>

<template>
  <section class="container">
    <form @submit="onSubmit" class="mx-auto mb-20 mt-10 max-w-sm space-y-8">
      <h1 class="text-center text-3xl font-bold">註冊 Fat4Fun 帳號</h1>
      <div class="flex flex-col gap-4">
        <FormInput id="email" label="電子信箱" v-model="email" :error="errors.email" />
        <FormInput id="username" label="使用者名稱" v-model="username" :error="errors.username" />
        <FormInput
          id="password"
          label="密碼"
          v-model="password"
          :error="errors.password"
          type="password"
        />
        <FormInput
          id="passwordConfirm"
          label="確認密碼"
          v-model="passwordConfirm"
          :error="errors.passwordConfirm"
          type="password"
        />
        <FormSelect
          optionLabel="name"
          optionValue="value"
          placeholder="選擇權限"
          id="role"
          label="帳號權限"
          class="w-full"
          :options="[
            { name: '管理員', value: 'ADMIN' },
            { name: '使用者', value: 'USER' }
          ]"
          :highlightOnSelect="true"
          v-model="role"
        />
      </div>
      <div class="space-y-6">
        <Button type="submit" class="w-full" label="註冊帳號" />
        <div class="flex flex-col gap-4 border-t pt-6">
          <h5 class="text-center text-xl font-bold">已有 Fat4Fun 帳號？</h5>

          <Button
            type="button"
            severity="info"
            as="router-link"
            :to="{ name: 'login' }"
            class="w-full"
            label="回登入頁面"
          />
        </div>
      </div>
    </form>
  </section>
</template>
