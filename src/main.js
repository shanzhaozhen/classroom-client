import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store/index'
import router from './router'

import '@/permission' // permission control

/*
  引入icon - ant官方图标库
 */
import './assets/iconfont/iconfont.css'

import './components/MyIcon/index'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
