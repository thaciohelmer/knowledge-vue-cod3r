import Vue from 'vue';
import axios from 'axios'
import { baseApiUrl } from "@/global";


axios.defaults.baseURL = baseApiUrl
axios.defaults.headers.get['Accepts'] = '*'


const sucess = res => res
const error = err => {
  if (401 === err.response.status) {
    window.location = '/'
  } else {
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(sucess, error)

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios
  }
})

export default axios