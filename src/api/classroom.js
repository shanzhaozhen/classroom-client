import request from '@/utils/request'

export function getClassRoomData(query) {
  return request({
    url: '/admin/classroom',
    method: 'get',
    params: query
  })
}

export function createClassRoom(data) {
  return request({
    url: '/admin/classroom',
    method: 'post',
    data: data
  })
}

export function updateClassRoom(data) {
  return request({
    url: '/admin/classroom',
    method: 'put',
    data: data
  })
}

export function deleteClassRoom(id) {
  return request({
    url: `/admin/classroom/${id}`,
    method: 'delete'
  })
}

export function getClassRoomSimpleData() {
  return request({
    url: '/admin/classroom/simple',
    method: 'get'
  })
}
