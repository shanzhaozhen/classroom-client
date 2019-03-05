/**
 * ajax请求函数模块
 * 返回值：promise (异步返回的数据是：response.data)
 */

import axios from 'axios'

export default function ajax (url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    // 执行异步请求
    let promise = {}

    if (type === 'GET' || type === 'get') {
      // 准备url、query参数数据
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr = dataStr + key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.get(url)
    }
    promise.then((response) => {
      // 成功时调用
      resolve(response.data)
    }).catch((error) => {
      // 失败时调用
      reject(error)
    })
  })
}
