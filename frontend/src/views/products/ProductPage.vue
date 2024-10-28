<script setup lang="ts">
import { customKy } from '@/utils/ky'
import { useQuery } from '@tanstack/vue-query'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { z } from 'zod'

const productSchema = z.object({
  _id: z.string(),
  category: z.string(),
  description: z.string(),
  mainImage: z.object({
    url: z.string(),
    localPath: z.string(),
    _id: z.string()
  }),
  name: z.string(),
  owner: z.string(),
  price: z.number(),
  stock: z.number(),
  subImages: z.array(z.object({ url: z.string(), localPath: z.string(), _id: z.string() })),
  __v: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})

const { params } = useRoute()
const { productId } = params
const { data, isPending, isError } = useQuery({
  queryKey: ['product', productId],
  queryFn: async () => {
    const data = await customKy.get(`ecommerce/products/${productId}`).json()
    console.log(data)
    const result = productSchema.safeParse(data)

    result.error && console.log(result.error)

    return data as z.infer<typeof productSchema>
  }
})

watchEffect(() => {
  console.log(data.value)
})
</script>

<template>
  <div>{{ params.productId }}</div>
  <div v-if="isError">Something went wrong...</div>
  <main v-else>
    <div v-if="true" class="flex animate-pulse gap-10 p-2">
      <div class="h-72 basis-1/2 rounded bg-slate-200 dark:bg-slate-700" />
      <div class="basis-1/2 space-y-4">
        <div class="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div class="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div class="h-4 w-2/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div class="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div class="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
    <div class="flex items-center rounded-lg bg-gray-100 p-6 shadow-md">
      <!-- Left side: Product image placeholder -->
      <div class="h-48 w-1/3 animate-pulse rounded-md bg-gray-300"></div>

      <!-- Right side: Product details placeholder -->
      <div class="ml-6 w-2/3 space-y-4">
        <!-- Product name placeholder -->
        <div class="h-6 w-1/2 animate-pulse rounded-md bg-gray-300"></div>

        <!-- Product description placeholder -->
        <div class="h-4 w-3/4 animate-pulse rounded-md bg-gray-300"></div>
        <div class="h-4 w-2/3 animate-pulse rounded-md bg-gray-300"></div>
        <div class="h-4 w-1/2 animate-pulse rounded-md bg-gray-300"></div>
      </div>
    </div>
  </main>
</template>
