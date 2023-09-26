import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import { router } from "./routes/routes.js"


import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(Quasar, {
  plugins: {}, 
})
app.use(router)
app.use(pinia)
app.mount('#app')