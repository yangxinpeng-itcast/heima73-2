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
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('heima73')).token
  }

})

export default instance
