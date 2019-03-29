import request from '@/utils/request'

export function getStudentData(classId, query) {
  return request({
    url: `/admin/students/${classId}`,
    method: 'get',
    params: query
  })
}

export function joinClass(classId, studentId) {
  return request({
    url: `/admin/student/${classId}`,
    method: 'post',
    data: studentId
  })
}

export function moveOutOfClass(id) {
  return request({
    url: `/admin/student/${id}`,
    method: 'delete'
  })
}
