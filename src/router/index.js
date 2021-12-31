import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(`@/views/index/index.vue`)
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import(`@/views/404.vue`)
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  const { auth, title } = to.meta;

  document.title = title || process.env.VUE_APP_NAME;

  if (auth && !isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router
