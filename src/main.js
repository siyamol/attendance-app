import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router.js'
import store from './store.js'
 import 'bootstrap'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import 'leaflet/dist/leaflet.css';

 

loadFonts()



const app = createApp(App)

app.use(vuetify)
app.use(router) 
app.use(store)
app.mount('#app')



