// 引入axios
import axios from 'axios'

// 配置默认选项
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('heima73')).token
// }
// console.log(JSON.parse(window.sessionStorage.getItem('heima73')).token)

// 封装
// 利用axios实例一个对象，将默认配置选项放进去
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // 因为如果手动删除了token后刷新页面这里会报错，所以不用这种写法
  //   headers: {
  //     Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('heima73')).token
  //   }

})

// 用请求拦截器来做，原理是 如果浏览器中有token则获取，如果没有则跳过，等以后发送ajax请求时再获取
instance.interceptors.request.use(config => {
  var user = window.sessionStorage.getItem('heima73')
  if (user) {
    // config为配置对象
    config.headers = {
      Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('heima73')).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  console.dir(error)
  return Promise.reject(error)
})

export default instance
