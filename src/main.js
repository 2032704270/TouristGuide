import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import 'mint-ui/lib/style.css'
import './plugins/mint.js'
Vue.config.productionTip = false

// 事件总线
Vue.prototype.$bus = new Vue()

// 封装的网络请求
import {request} from './network/axios'
Vue.prototype.$axios = request

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  data: function(){
    return {
      URL: 'http://119.29.68.100/public/',
    }
  },
}).$mount('#app')
