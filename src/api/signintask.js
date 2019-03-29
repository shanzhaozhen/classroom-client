import request from '@/utils/request'

export function getSignInTaskData(query) {
  return request({
    url: '/admin/signintask',
    method: 'get',
    params: query
  })
}

export function createSignInTask(data) {
  return request({
    url: '/admin/signintask',
    method: 'post',
    data: data
  })
}

export function updateSignInTask(data) {
  return request({
    url: '/admin/signintask',
    method: 'put',
    data: data
  })
}

export function deleteSignInTask(id) {
  return request({
    url: `/admin/signintask/${id}`,
    method: 'delete'
  })
}

export function getAttendanceRateBySignInTaskId(signInTaskId) {
  return request({
    url: `/admin/signintask/attendance/${signInTaskId}`,
    method: 'get'
  })
}

