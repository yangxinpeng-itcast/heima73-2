// 这里是封装插件

// 引入面包屑组件进行封装
import MyBread from './my-bread'

// 引入子组件进行封装
import MySon from './son'

// 引入频道组件
import MyChannel from './my-channel'

// 1.注册所有组件在Vue对象下
// 2.封装成插件的形式
// 当Vue.use(插件)的时候，执行插件的配置对象中install函数，传入Vue对象
export default {
  // 执行install函数时会自动传入Vue对象
  install (Vue) {
    // 组测所有组件在Vue下
    Vue.component(MyBread.name, MyBread)
    Vue.component(MySon.name, MySon)
    Vue.component(MyChannel.name, MyChannel)
  }
}
