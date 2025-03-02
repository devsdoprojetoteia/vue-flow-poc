import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/store'
import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config.ts'

createApp(App)
  .use(store)
  .use(plugin, defaultConfig(config))
  .mount('#app')
