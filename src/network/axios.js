import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(obj) {
  if(obj.method === 'post') obj.data = qs.stringify(obj.data);
    const instance = axios.create({
      baseURL: '/api/', //解决跨域
      // baseURL: 'http://119.29.68.100/public/',
      timeuot: 5000
    })
    instance.interceptors.request.use(config => {
      // console.log(config)
      NProgress.start()
      if(this.$store.getters.getToken) {
        config.headers.Authorization = this.$store.getters.getToken;
      }
      return config
    })
    instance.interceptors.response.use(config => {
      NProgress.done()
      return config
    })
    return instance(obj)
}