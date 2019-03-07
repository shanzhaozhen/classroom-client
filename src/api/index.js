/**
 * n个接口请求函数的模块
 */
import ajax from './ajax'

// const BASE_URL = 'http://127.0.0.1:8080/classroom'
const BASE_URL = '/api'

export const demo1 = (data) => ajax(`${BASE_URL}/url/${data}`)

export const demo2 = (data) => ajax(BASE_URL + '/url', 'GET', data)

/**
 * 注册请求
 */
export const register = ({username, password}) => ajax(`${BASE_URL}/register`, 'POST', {username, password})


/**
 * 检查用户名时候已经被注册过
 */
export const checkUsername = ({username}) => ajax(`${BASE_URL}/register/${username}`, 'GET')


/**
 * 登陆请求
 */
export const login = ({username, password, rememberMe}) => ajax(`${BASE_URL}/login`, 'POST', {username, password, rememberMe})

