import request from '@/utils/request'

export function download(fileId) {
  return request({
    url: `/api/download/${fileId}`,
    method: 'get',
    responseType: 'blob'
  })
}
