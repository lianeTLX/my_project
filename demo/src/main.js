import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

import './assets/stylesheet/reset.css'
import './assets/font/font.css'

Vue.config.productionTip = false
// Vue.prototype.axios = axios
Vue.prototype.axios = axios.create({
  baseURL: 'http://nas.yysxyy.com:10911'
  // baseURL: 'http://gaoyue.tpddns.cn:10911'
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    editFlag: false,
    currentData: {
      mode: 'add',
      data: {}
    }
  },
  mutations: {
    setEditFlag(state, val) {
      state.editFlag = val
    },
    setCurrentData(state, obj) {
      state.currentData = obj
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
