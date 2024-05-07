import '../src/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import api from './api'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives
})

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$api = api

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
