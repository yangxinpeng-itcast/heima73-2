import Vue from 'vue'
import App from './App.vue'

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入router对象
import router from '@/router'

// 引入axios文件
import axios from '@/api/axios.js'
// import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 在全局注册组件
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
