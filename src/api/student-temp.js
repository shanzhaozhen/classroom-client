import request from '@/utils/request'

export function getStudentTempData(query) {
  return request({
    url: `/admin/student-temp`,
    method: 'get',
    params: query
  })
}

export function passStudent(id) {
  return request({
    url: `/admin/student-temp/${id}/pass`,
    method: 'put',
  })
}

export function refuseStudent(id) {
  return request({
    url: `/admin/student-temp/${id}`,
    method: 'delete'
  })
}


