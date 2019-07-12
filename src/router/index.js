// 创建路由对象，配置路由规则

// 导入vue-router
import VueRouter from 'vue-router'
// 需要Vue对象
import Vue from 'vue'
// 导入login组件
import login from '@/views/login'

// 导入home页
import home from '../views/home'

// 引入main页
import Main from '../views/main'

// 引入404页面
import NotFound from '../views/NotFound'

// 在全局注册组件
// Vue.use(VueRouter)
Vue.use(VueRouter)
// 配置路由规则
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/',
      component: home,
      children: [
        { path: '/pp', component: Main }
      ] },
    { path: '*', name: '404', component: NotFound }

  ]
})

// 导出
export default router
