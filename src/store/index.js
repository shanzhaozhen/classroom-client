/**
 * vuex最核心的管理对象
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import app from './modules/app'
import user from './modules/user'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  state,
  mutations,
  actions,
  getters
})
