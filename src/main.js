// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
console.log( Vue );
import {Input,Style,Button,ScrollNav,Popup,Scroll,Drawer,Textarea,Radio,Dialog,TabBar,
  TabPanels,Slide,ActionSheet,Select,Upload,Checkbox,CheckboxGroup,Toast,Form} from 'cube-ui'
Vue.use(Input)
Vue.use(Button)
Vue.use(ScrollNav)
Vue.use(Popup)
Vue.use(Scroll)
Vue.use(Drawer)
Vue.use(Textarea)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Slide)
Vue.use(ActionSheet)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Toast)
Vue.use(Form)
import './permission' // permission control

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})
