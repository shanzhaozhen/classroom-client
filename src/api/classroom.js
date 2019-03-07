import request from '@/utils/request'

export function getClassRoomData(query) {
  return request({
    url: '/classroom/list',
    method: 'get',
    params: query
  })
}
