import Vue from 'vue'
import App from './App.vue'

// 引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共样式
import './components/style/style.less'

// 引入router对象
import router from '@/router'

// 引入axios文件
import axios from '@/api/axios.js'

// 引入组件插件
import components from '@/components'
// import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(components)

// 在全局注册组件
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
