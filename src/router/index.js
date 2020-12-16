import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import user from '@/views/user'
import home from '@/views/home'
import search from '@/views/search'

import login from '@/views/login'
import placeOrder from '@/views/placeOrder'
import successPlaceOrder from '@/views/successPlaceOrder'
import my from '@/views/my'


import table from '@/views/table'
import userOrder from '@/views/userOrder'
import order from '@/views/order'
import orderDetail from '@/views/order/detail'
import confirm from '@/views/confirm'

import pay from '@/views/pay'
import indexDetail from '@/views/indexDetail'

import paySuccess from '@/views/paySuccess'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user'
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/home/:store_id/:table_id?/:active?',
      name: 'home',
      component: home
    },
    {
      path: '/search/:store_id/:table_id',
      name: 'search',
      component: search
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/placeOrder/:id',
      name: 'placeOrder',
      component: placeOrder
    },
    {
      path: '/successPlaceOrder/:id',
      name: 'successPlaceOrder',
      component: successPlaceOrder
    },
    {
      path: '/paySuccess/:id',
      name: 'paySuccess',
      component: paySuccess
    },
    {
      path: '/userOrder',
      name: 'userOrder',
      component: userOrder
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/confirm/:cart_id?/:order_id?',
      name: 'confirm',
      component: confirm
    },
    {
      path: '/pay/:order_id/:order_amount?',
      name: 'pay',
      component: pay
    },
    {
      path: '/indexDetail/:id/:table_id',
      name: 'indexDetail',
      component: indexDetail
    }
  ],
  linkActiveClass: 'active'
})
