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
// 生产环境使用
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/ols_project/' : ''
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
