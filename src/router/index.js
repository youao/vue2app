import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(`@/views/index/index.vue`)
  },
  {
    path: '/taobao/list',
    name: 'taobaoList',
    meta: {
      title: '淘宝列表'
    },
    component: () => import(`@/views/fanli/taobao/list.vue`)
  },
  {
    path: '/jd/list',
    name: 'jdList',
    meta: {
      title: '京东列表'
    },
    component: () => import(`@/views/fanli/jd/list.vue`)
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      auth: true
    },
    component: () => import(`@/views/user/index.vue`)
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(`@/views/user/login.vue`)
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import(`@/views/404.vue`)
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  const { auth, title } = to.meta;
  document.title = title || process.env.VUE_APP_NAME;

  const isLogin = store.getters.isLogin;
  if (auth && !isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router
