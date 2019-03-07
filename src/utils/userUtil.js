/**
 * 用于管理用户的信息的工具
 */
import Cookies from 'js-cookie'

const TOKEN_KEY = 'Class-Token'

export default {
  saveToken (token) {
    Cookies.set(TOKEN_KEY, token)
  },
  readToken () {
    Cookies.get(TOKEN_KEY)
  },
  clearToken () {
    Cookies.remove(TOKEN_KEY)
  }
}
