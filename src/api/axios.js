
// 引入axios
import axios from 'axios'

// 配置默认选项
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('heima73')).token
}
// console.log(JSON.parse(window.sessionStorage.getItem('heima73')).token)

export default axios
