import request from '@/utils/request'

export function getSignInData(signTaskId, query) {
  return request({
    url: `/admin/sign-task/${signTaskId}/sign`,
    method: 'get',
    params: query
  })
}

export function exportSignInDataBySignTaskId(signTaskId) {
  return request({
    url: `/admin/sign-task/${signTaskId}/export`,
    method: 'get',
    responseType: 'blob'
  })
}

