import Vue from 'vue'
import App from './App.vue'

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from 'axios'
// 引入router对象
import router from '@/router'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 在全局注册组件
Vue.use(ElementUI)

// 默认匹配选项
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
