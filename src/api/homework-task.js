import request from '@/utils/request'

export function getHomeworkTaskData(query) {
  return request({
    url: '/admin/homework-task',
    method: 'get',
    params: query
  })
}

export function createHomeworkTask(data) {
  return request({
    url: '/admin/homework-task',
    method: 'post',
    data: data
  })
}

export function updateHomeworkTask(data) {
  return request({
    url: '/admin/homework-task',
    method: 'put',
    data: data
  })
}

export function deleteHomeworkTask(id) {
  return request({
    url: `/admin/homework-task/${id}`,
    method: 'delete'
  })
}

export function getCommitRateByHomeworkTaskId(homeworkTaskId) {
  return request({
    url: `/admin/homework-task/${homeworkTaskId}/commit`,
    method: 'get'
  })
}

