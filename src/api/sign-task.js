import request from '@/utils/request'

export function getSignTaskData(query) {
  return request({
    url: '/admin/sign-task',
    method: 'get',
    params: query
  })
}

export function createSignTask(data) {
  return request({
    url: '/admin/sign-task',
    method: 'post',
    data: data
  })
}

export function updateSignTask(data) {
  return request({
    url: '/admin/sign-task',
    method: 'put',
    data: data
  })
}

export function deleteSignTask(id) {
  return request({
    url: `/admin/sign-task/${id}`,
    method: 'delete'
  })
}

export function getAttendanceRateBySignTaskId(signTaskId) {
  return request({
    url: `/admin/sign-task/${signTaskId}/attendance`,
    method: 'get'
  })
}

