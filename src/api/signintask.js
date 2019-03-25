import request from '@/utils/request'

export function getSignInTaskData(query) {
  return request({
    url: '/api/admin/signintask',
    method: 'get',
    params: query
  })
}

export function createSignInTask(data) {
  return request({
    url: '/api/admin/signintask',
    method: 'post',
    data: data
  })
}

export function updateSignInTask(data) {
  return request({
    url: '/api/admin/signintask',
    method: 'put',
    data: data
  })
}

export function deleteSignInTask(id) {
  return request({
    url: `/api/admin/signintask/${id}`,
    method: 'delete'
  })
}
