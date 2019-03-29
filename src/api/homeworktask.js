import request from '@/utils/request'

export function getHomeworkTaskData(query) {
  return request({
    url: '/admin/homeworktask',
    method: 'get',
    params: query
  })
}

export function createHomeworkTask(data) {
  return request({
    url: '/admin/homeworktask',
    method: 'post',
    data: data
  })
}

export function updateHomeworkTask(data) {
  return request({
    url: '/admin/homeworktask',
    method: 'put',
    data: data
  })
}

export function deleteHomeworkTask(id) {
  return request({
    url: `/admin/homeworktask/${id}`,
    method: 'delete'
  })
}

