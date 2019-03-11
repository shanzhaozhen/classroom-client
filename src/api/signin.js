import request from '@/utils/request'

export function getSignInData(signInTaskId, query) {
  return request({
    url: `/api/admin/signins/${signInTaskId}`,
    method: 'get',
    params: query
  })
}

