import request from '@/utils/request'

export function getSignInData(signInTaskId, query) {
  return request({
    url: `/admin/signins/${signInTaskId}`,
    method: 'get',
    params: query
  })
}

