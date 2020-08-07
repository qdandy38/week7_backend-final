import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import sweetAlert2 from 'sweetalert2'
import jquery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/all.scss'

Vue.config.productionTip = false
Vue.component('loading', Loading) // vue-loading-overlay
Vue.use(VueAxios, axios) // axios
window.$ = jquery // jquery
window.Swal = sweetAlert2

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
