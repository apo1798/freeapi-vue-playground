<script setup lang="ts">
import { customKy } from '@/utils/ky'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed, effect, ref, watch, watchEffect } from 'vue'
import { z } from 'zod'
import { LoaderCircle } from 'lucide-vue-next'

const productsSchema = z.object({
  products: z.array(
    z.object({
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
  ),
  totalProducts: z.number(),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
  serialNumberStartFrom: z.number(),
  hasPrevPage: z.boolean(),
  hasNextPage: z.boolean(),
  prevPage: z.number().nullable(),
  nextPage: z.number().nullable()
})

const pagination = ref({ page: 1, limit: 10 })
const { data, isFetching, isPending, isError } = useQuery({
  queryKey: computed(() => ['products', pagination.value.limit, pagination.value.page]),
  queryFn: async () => {
    const res = await customKy
      .get('ecommerce/products', { searchParams: { ...pagination.value } })
      .json()
    const result = productsSchema.safeParse(res)
    console.log(result.error)
    return result.data
  },
  placeholderData: keepPreviousData
})

const carouselItems = ref([
  {
    id: '1000',
    image: '/image/ii1.webp'
  },
  {
    id: '1001',
    image: '/image/ii2.webp'
  },
  {
    id: '1002',
    image: '/image/ii3.webp'
  },
  {
    id: '1003',
    image: '/image/ii4.webp'
  },
  {
    id: '1004',
    image: '/image/ii5.webp'
  },
  {
    id: '1005',
    image: '/image/ii6.webp'
  }
])
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '780px',
    numVisible: 1,
    numScroll: 1
  }
])
watchEffect(() => {
  console.log(data.value)
})
</script>

<template>
  <main class="mb-20 space-y-10">
    <div class="relative">
      <Carousel
        class=""
        :value="carouselItems"
        :numVisible="1"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="6000"
        :prevButtonProps="{
          class: 'absolute z-10 left-4 rounded-full opacity-50 hover:opacity-100 transition-opacity'
        }"
        :nextButtonProps="{
          class:
            'absolute z-10 right-4 rounded-full opacity-50 hover:opacity-100 transition-opacity'
        }"
      >
        <template #item="slotProps">
          <div>
            <div class="mb-4">
              <div class="relative mx-auto">
                <img
                  :src="slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="max-h-[calc(100vh-72px)] w-full rounded object-cover"
                />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <div
        class="absolute right-1/2 top-1/2 w-full -translate-y-1/2 translate-x-1/2 text-center font-bold sm:right-16 sm:-translate-x-0 sm:text-end md:right-20"
      >
        <h1
          class="text-3xl leading-none text-white [text-shadow:0px_0px_3px_#000] sm:text-3xl lg:text-4xl xl:text-7xl"
        >
          歡迎來到 Fat4Fun
        </h1>
        <p
          class="text-base text-white [text-shadow:0px_0px_3px_#000] sm:text-xl md:text-2xl xl:text-3xl"
        >
          探索我們的最新商品和優惠活動
        </p>
        <Button class="mt-2" size="large">立即購買</Button>
      </div>
    </div>
    <section class="container space-y-8">
      <h2 class="flex items-center justify-center gap-2 text-center text-5xl font-bold">
        熱銷商品
        <LoaderCircle class="animate-spin" v-if="isFetching" />
      </h2>
      <div v-if="isError">error</div>
      <div v-else>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <template v-if="isPending">
            <li
              v-for="(_, i) in Array.from({ length: 10 })"
              :key="i"
              class="aspect=[3/2] h-52 animate-pulse bg-slate-300 dark:bg-slate-50"
            />
          </template>

          <template v-if="data?.products">
            <li v-for="product in data.products" :key="product._id" class="flex flex-col gap-1">
              <RouterLink :to="`/products/${product._id}`">
                <Card
                  class="h-full shadow-white transition-all duration-500 hover:shadow-lg dark:shadow-gray-700"
                >
                  <template #header>
                    <div class="aspect-[3/2] overflow-hidden rounded">
                      <img :src="product.mainImage.url" class="aspect-[3/2] object-cover" />
                    </div>
                  </template>
                  <template #title>
                    <AppHeader level="h4">{{ product.name }}</AppHeader>
                  </template>
                  <template #content>
                    <p>{{ product.description }}</p>
                  </template>
                </Card>
              </RouterLink>
            </li>
            <Paginator
              class="col-span-full"
              :first="(pagination.page - 1) * pagination.limit"
              :rows="pagination.limit"
              :totalRecords="data.totalProducts"
              :rowsPerPageOptions="[10, 20, 25]"
              @update:rows="
                (num) => {
                  pagination.limit = num
                }
              "
              @update:first="
                (first) => {
                  pagination.page = first / pagination.limit + 1
                }
              "
            />
          </template>
        </ul>
      </div>
    </section>
  </main>
</template>
