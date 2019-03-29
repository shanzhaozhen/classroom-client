import request from '@/utils/request'

export function download(fileId) {
  return request({
    url: `/download/${fileId}`,
    method: 'get',
    responseType: 'blob'
  })
}
