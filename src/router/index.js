// 创建路由对象，配置路由规则

// 导入vue-router
import VueRouter from 'vue-router'
// 需要Vue对象
import Vue from 'vue'
// 导入login组件
import login from '@/views/login'

// 在全局注册组件
Vue.use(VueRouter)

// 配置路由规则
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login }

  ]
})

// 导出
export default router
