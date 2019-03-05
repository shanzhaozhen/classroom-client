import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store/index'

import router from './router'

/*
  引入icon - ant官方图标库
 */
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
