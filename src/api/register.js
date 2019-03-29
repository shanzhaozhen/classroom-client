import request from '@/utils/request'

/**
 * 注册请求
 */
export function register(registerFrom) {
  return request({
    url: '/register',
    method: 'post',
    data: registerFrom
  })
}

/**
 * 检查用户名时候已经被注册过
 */
export function checkUsername({username}) {
  return request({
    url: `/register/${username}`,
    method: 'get'
  })
}
