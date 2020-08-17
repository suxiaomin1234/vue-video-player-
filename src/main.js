import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/iconfont.js'
import './assets/js/svg'
import './assets/stylus/swiper-bundle.css'
import  './assets/js/swiper-bundle.js'

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

// import './assets/stylus/swiper-bundle.css'
// import  './assets/js/swiper-bundle.js'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
