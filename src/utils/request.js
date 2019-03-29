import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const TOKEN_HEADER = 'Class-Token'

// 创建axios实例
const service = axios.create({
  baseURL: '/api' + process.env.BASE_URL, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers[TOKEN_HEADER] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const res = error.response.data

    if (res.status === 401) {
      /**
       * (4010, "密码账号认证出错")
       * (4011, "token签名异常")
       * (4012, "token格式不正确")
       * (4013, "token已过期")
       * (4014, "不支持该token")
       * (4015, "token参数异常")
       * (4016, "token错误")
       */
      if (res.code === 4010) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code > 4010 && res.code <= 4016) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
