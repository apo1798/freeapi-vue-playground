<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { ref, type Ref } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  isDark.value = true
  document.documentElement.classList.add('dark')
}

const items: Ref<MenuItem[]> = ref([
  {
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    label: 'Features',
    icon: 'pi pi-star'
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Core',
        icon: 'pi pi-bolt',
        shortcut: '⌘+S'
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
        shortcut: '⌘+B'
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
        shortcut: '⌘+U'
      },
      {
        separator: true
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
            badge: 2
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
            badge: 3
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <Menubar class="flex gap-5" :model="items">
    <template #start>
      <RouterLink to="/" class="flex items-center gap-2 font-medium text-2xl">
        <i class="pi pi-desktop text-3xl text-orange-400 font-bold"></i>
        電腦先生屋
      </RouterLink>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
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
        <div>
          <Button
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            @click="toggleDarkMode"
            size="small"
            aria-label="Toggle Theme"
            link
            class="hover:bg-zinc-100 dark:hover:bg-zinc-700"
          />
        </div>
        <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
        <Avatar image="/amyelsner.png" shape="circle" />
      </div>
    </template>
  </Menubar>
  <slot />
</template>
