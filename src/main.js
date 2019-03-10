import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.js.scss' // global css

import App from './App.vue'
import store from './store/index'
import router from './router'

import VueAMap from 'vue-amap'

import '@/permission' // permission control

/*
  引入icon - ant官方图标库
 */
import './assets/iconfont/iconfont.css'

import './components/MyIcon/index'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'd99189e5551eeb6856a3b841f9b95c87',
  plugin: [
    'AMap.Autocomplete',    //输入提示插件
    'AMap.PlaceSearch',     //POI搜索插件
    'AMap.Scale',           //右下角缩略图插件 比例尺
    'AMap.OverView',        //地图鹰眼插件
    'AMap.ToolBar',         //地图工具条
    'AMap.MapType',         //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor',      //编辑 折线多，边形
    'AMap.CircleEditor',    //圆形编辑器插件
    "AMap.Geolocation",     //定位控件，用来获取和展示用户主机所在的经纬度位置
    "Geocoder"              //坐标换地址服务
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
