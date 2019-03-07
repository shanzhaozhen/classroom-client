// import ajax from './ajax'
import request from '@/utils/request'

const BASE_URL = '/api'

/**
 * 登陆请求
 */
export function login({ username, password, rememberMe }) {
  return request({
    url: `${BASE_URL}/login`,
    method: 'post',
    data: {
      username,
      password,
      rememberMe
    }
  })
}

// export function login({username, password, rememberMe}) {
//   return new Promise((resolve, reject) => {
//     ajax(`${BASE_URL}/login`, 'POST', {username, password, rememberMe}).then(response => {
//       resolve(response)
//     }).catch(error => {
//       reject(error.response)
//     })
//   })
// }

export function getUserInfo() {
  return request({
    url: `${BASE_URL}/user/info`,
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
