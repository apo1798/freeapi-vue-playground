<script setup lang="tsx">
import clsx from 'clsx'
import type { MenuItem } from 'primevue/menuitem'
import { ref, type Ref } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const savedTheme = localStorage.getItem('theme')
if (
  savedTheme === 'dark' ||
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  isDark.value = true
  document.documentElement.classList.add('dark')
}

const items: Ref<MenuItem[]> = ref([
  {
    label: '最新消息',
    icon: 'pi pi-info-circle'
  },
  {
    label: '熱門商品',
    icon: 'pi pi-star'
  },
  {
    label: 'PC 專區',
    icon: 'pi pi-desktop'
  },
  {
    label: '周邊專區'
  }
])

const footerItems = [
  {
    title: '關於我們',
    content: (
      <p>
        Fat4Fun 是一家致力於提供高性能電競設備的公司
        <br />
        專注於滿足玩家的需求。
      </p>
    )
  },
  {
    title: '聯絡我們',
    content: (
      <ul>
        <li>Email: support@fat4fun.com</li>
        <li>電話: +886 1234-5678</li>
      </ul>
    )
  },
  {
    title: '關注我們',
    content: (
      <div class="flex justify-center gap-6">
        <a
          href="https://www.facebook.com/profile.php?id=100009114848126"
          rel="noopner noreferrer"
          target="_blank"
        >
          <span class="pi pi-facebook text-3xl" />
        </a>
        <a href="https://www.instagram.com/liaohongming/" rel="noopner noreferrer" target="_blank">
          <span class="pi pi-instagram text-3xl" />
        </a>
      </div>
    )
  }
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Menubar
      class="sticky flex gap-5 rounded-none bg-white/90 backdrop-blur-[3px] dark:bg-black/90"
      :model="items"
    >
      <template #start>
        <RouterLink to="/" class="flex items-center gap-2 text-2xl font-medium">
          <img src="/logo1.webp" class="h-1w-16 w-16 rounded" />
        </RouterLink>
      </template>
      <template #buttonicon>
        <span class="pi pi-bars text-xl font-bold"></span>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span v-if="item.icon" :class="item.icon" class="text-xl" />
          <span
            :class="
              clsx({
                'text-2xl': item.icon
              })
            "
            class="text-xl"
            >{{ item.label }}</span
          >
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="border-surface bg-emphasis text-muted-color ml-auto rounded border p-1 text-xs"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
          <Button
            @click="toggleDarkMode"
            aria-label="Toggle Theme"
            link
            class="font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <span :class="clsx(isDark ? 'pi pi-sun' : 'pi pi-moon', 'text-lg')" />
          </Button>
          <Button
            as="RouterLink"
            link
            icon="pi pi-user"
            to="/user"
            class="font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700"
          />
          <Button
            as="RouterLink"
            link
            icon="pi pi-shopping-cart"
            to="/user"
            class="font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700"
          />
        </div>
      </template>
    </Menubar>
    <main class="grow">
      <slot />
    </main>
    <footer class="bg-slate-700 py-5 text-white">
      <div class="mx-auto max-w-7xl px-6">
        <ul
          class="mb-5 gap-10 divide-y divide-white/50 border-b border-gray-400 pb-10 text-center md:flex md:grid-rows-3 md:divide-y-0"
        >
          <li v-for="item in footerItems" :key="item.title" class="basis-1/3 py-4">
            <h5 class="mb-2 text-xl font-bold">
              {{ item.title }}
            </h5>
            <component :is="item.content" />
          </li>
        </ul>
        <div class="flex justify-center gap-2">
          <div class="text-gray-300">Fat4Fun © 2024. All rights reserved.</div>
          <div class="flex gap-2">
            <a href="">隱私政策</a>
            |
            <a href="">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
