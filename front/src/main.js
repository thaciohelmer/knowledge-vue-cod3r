import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'

import './config/axios'
import 'font-awesome/css/font-awesome.css'
import './config/bootstrap'
import './config/msg'
import './config/mq'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
