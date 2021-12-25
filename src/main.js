import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Rem from './utils/rem'
Rem();

import Page from "./components/bscroll/page"
Vue.component('Page', Page)

import Toast from './components/popup/toast'
import { install as toastInstall } from './components/popup/toast/handler.js'
import Dialog from './components/popup/dialog'
import { install as dialogInstall } from './components/popup/dialog/handler.js'
import Actionsheet from './components/popup/actionsheet'
import { install as actionsheetInstall } from './components/popup/actionsheet/handler.js'
toastInstall(Vue, Toast)
dialogInstall(Vue, Dialog)
actionsheetInstall(Vue, Actionsheet)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');