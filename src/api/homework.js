import request from '@/utils/request'

export function getHomeworkData(homeworkTaskId, query) {
  return request({
    url: `/admin/homework-task/${homeworkTaskId}/homework`,
    method: 'get',
    params: query
  })
}

export function giveHomeworkScore(homeworkId, query) {
  return request({
    url: `/admin/homework/${homeworkId}/score`,
    method: 'put',
    params: query
  })
}

export function getHomeworkDetail(homeworkId) {
  return request({
    url: `/admin/homework/${homeworkId}`,
    method: 'get'
  })
}

export function exportHomeworkDataByHomeworkTaskId(homeworkTaskId) {
  return request({
    url: `/admin/homework-task/${homeworkTaskId}/export`,
    method: 'get',
    responseType: 'blob'
  })
}

