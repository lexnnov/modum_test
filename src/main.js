import { createApp } from 'vue'

import App from './Home.vue'
import store  from '../store'
import router from '../router'

const app = createApp(App)
app.config.devtools = true

app.use(store)
app.use(router)

app.mount("#app");
