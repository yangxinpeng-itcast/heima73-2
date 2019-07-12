import Vue from 'vue'
import App from './App.vue'

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from 'axios'
// console.log(JSON.parse(window.sessionStorage.getItem('heima73')).token)

// 引入router对象
import router from '@/router'

// 配置默认选项
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('heima73')).token
}
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 在全局注册组件
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
