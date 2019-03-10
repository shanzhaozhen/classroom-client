import request from '@/utils/request'

export function getClassRoomData(query) {
  return request({
    url: '/api/admin/classroom',
    method: 'get',
    params: query
  })
}

export function createClassRoom(data) {
  return request({
    url: '/api/admin/classroom',
    method: 'post',
    data: data
  })
}

export function updateClassRoom(data) {
  return request({
    url: '/api/admin/classroom',
    method: 'put',
    data: data
  })
}

export function deleteClassRoom(id) {
  return request({
    url: `/api/admin/classroom/${id}`,
    method: 'delete'
  })
}

export function getClassRoomSimpleData() {
  return request({
    url: '/api/admin/classroom/simple',
    method: 'get'
  })
}
