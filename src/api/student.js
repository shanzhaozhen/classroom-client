import request from '@/utils/request'

export function getStudentData(classroomId, query) {
  return request({
    url: `/admin/classroom/${classroomId}/student`,
    method: 'get',
    params: query
  })
}

export function joinClass(classroomId, studentId) {
  return request({
    url: `/admin/student`,
    method: 'post',
    data: {
      classroomId,
      studentId
    }
  })
}

export function moveOutOfClass(id) {
  return request({
    url: `/admin/student/${id}`,
    method: 'delete'
  })
}

export function exportStudentDataByClassroomId(classroomId) {
  return request({
    url: `/admin/classroom/${classroomId}/student/export`,
    method: 'get',
    responseType: 'blob'
  })
}

