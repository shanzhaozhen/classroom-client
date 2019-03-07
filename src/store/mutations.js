/**
 * 直接更新state的多个方法对象
 */
import {
  SAVE_TOKEN,
  RECEIVE_USER_INFO
} from './mutations-type'

export default {
  [SAVE_TOKEN] (state, {userInfo}) {
    state.token = userInfo
  }
}
