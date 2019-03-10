import request from '@/utils/request'

const BASE_URL = '/api'

/**
 * 登陆请求
 */
export function login({ username, password, rememberMe }) {
  return request({
    url: `/api/login`,
    method: 'post',
    data: {
      username,
      password,
      rememberMe
    }
  })
}

export function getUserInfo() {
  return request({
    url: `${BASE_URL}/admin/user/info`,
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
