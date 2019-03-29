import request from '@/utils/request'

/**
 * 登陆请求
 */
export function login({ username, password, rememberMe }) {
  return request({
    url: '/login',
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
    url: '/admin/user/info',
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
