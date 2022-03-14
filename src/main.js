import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

Vue.config.productionTip = false
Vue.prototype.$api = "https://benchmarkapi.nelbert442.com:8224"

Vue.use(Notifications, { velocity })
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')