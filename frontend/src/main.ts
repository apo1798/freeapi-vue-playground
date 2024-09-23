import 'primeicons/primeicons.css'
import './assets/main.css'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import router from './router'
import { Noir } from './style/theme'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      darkModeSelector: '.dark'
    }
  }
})
app.use(ToastService)

app.mount('#app')
