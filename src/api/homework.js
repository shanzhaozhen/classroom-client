import request from '@/utils/request'

export function getHomeworkData(homeworkTaskId, query) {
  return request({
    url: `/admin/homeworks/${homeworkTaskId}`,
    method: 'get',
    params: query
  })
}

export function giveHomeworkScore(homeworkId, query) {
  return request({
    url: `/admin/homework/giveScore/${homeworkId}`,
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

