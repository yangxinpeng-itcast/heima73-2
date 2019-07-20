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

// 引入内容管理
import article from '../views/article'

// 引入内容管理页
import publish from '../views/publish'

// 引入素材管理页
import image from '../views/image'

// 引入评论管理页
import Comment from '../views/comment'

// 引入个人设置页
import Setting from '../views/setting'

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
        { path: '/', component: Main },
        { path: '/article', component: article },
        { path: '/publish', component: publish },
        { path: '/image', component: image },
        { path: '/comment', component: Comment },
        { path: '/setting', component: Setting }
      ] },
    { path: '*', name: '404', component: NotFound }

  ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
  const url = window.sessionStorage.getItem('heima73')
  if (to.path !== '/login' && !url) {
    return next('/login')
  }
  next()
})

// 导出
export default router
