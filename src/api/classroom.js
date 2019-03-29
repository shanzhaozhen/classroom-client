import request from '@/utils/request'

export function getClassroomData(query) {
  return request({
    url: '/admin/classroom',
    method: 'get',
    params: query
  })
}

export function createClassroom(data) {
  return request({
    url: '/admin/classroom',
    method: 'post',
    data: data
  })
}

export function updateClassroom(data) {
  return request({
    url: '/admin/classroom',
    method: 'put',
    data: data
  })
}

export function deleteClassroom(id) {
  return request({
    url: `/admin/classroom/${id}`,
    method: 'delete'
  })
}

export function getClassroomSimpleData() {
  return request({
    url: '/admin/classroom/simple',
    method: 'get'
  })
}
