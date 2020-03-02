import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import './assets/css/edit.css'
import './assets/css/jquery.imageLabel.min.css'
// import './assets/scripts/jquery.imageLabel.min.js'
// import $ from 'jquery'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8080/'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
// Vue.prototype.$ = $

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
