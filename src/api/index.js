/**
 * n个接口请求函数的模块
 */
import ajax from './ajax'

const BASE_URL = 'http://127.0.0.1:8080'

export const demo1 = (data) => ajax(`${BASE_URL}/url/${data}`)

export const demo2 = (data) => ajax(BASE_URL + '/url', 'GET', data)
