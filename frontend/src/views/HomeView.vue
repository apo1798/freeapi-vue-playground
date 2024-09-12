<script setup>
import { ref, onMounted } from 'vue'

const products = ref([
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
</script>

<template>
  <!-- <h2 class="text-5xl text-center mb-5">電競主機</h2> -->
  <div class="relative">
    <Carousel
      class=""
      :value="products"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="6000"
      :prevButtonProps="{
        class: 'absolute z-10 left-4 rounded-full opacity-50 hover:opacity-100 transition-opacity'
      }"
      :nextButtonProps="{
        class: 'absolute z-10 right-4 rounded-full opacity-50 hover:opacity-100 transition-opacity'
      }"
    >
      <template #item="slotProps">
        <div>
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.image"
                :alt="slotProps.data.name"
                class="max-h-[calc(100vh-72px)] object-cover w-full rounded"
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
    <div
      class="absolute top-1/2 right-1/2 sm:right-16 md:right-20 -translate-y-1/2 translate-x-1/2 sm:-translate-x-0 font-bold text-center sm:text-end w-full"
    >
      <h1
        class="text-3xl sm:text-3xl lg:text-4xl xl:text-7xl text-white [text-shadow:0px_0px_3px_#000] leading-none"
      >
        歡迎來到 Fat4Fun
      </h1>
      <p
        class="text-base sm:text-xl md:text-2xl xl:text-3xl text-white [text-shadow:0px_0px_3px_#000]"
      >
        探索我們的最新商品和優惠活動
      </p>
      <Button class="mt-2" size="large">立即購買</Button>
    </div>
  </div>
</template>
