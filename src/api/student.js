import request from '@/utils/request'

export function getStudentData(classId, query) {
  return request({
    url: `/api/admin/student/${classId}`,
    method: 'get',
    params: query
  })
}

export function joinClass(classId, studentId) {
  return request({
    url: `/api/admin/student/${classId}`,
    method: 'post',
    data: studentId
  })
}

export function moveOutOfClass(id) {
  return request({
    url: `/api/admin/student/${id}`,
    method: 'delete'
  })
}
