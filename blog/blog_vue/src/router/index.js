import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/home/new',
    children: [
      {
        path: '/home/new',
        name: 'NewArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/homeArt/NewArt.vue')
      },
      {
        path: '/home/hot',
        name: 'HotArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/homeArt/HotArt.vue')
      },
      {
        path: '/home/all',
        name: 'AllArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/homeArt/AllArt.vue')
      },
      {
        path: '/home/about',
        name: 'AboutArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/homeArt/AboutArt.vue')
      },
      {
        path: '/home/msg',
        name: 'MsgArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/homeArt/MsgArt.vue')
      },
      {
        path: '/home/tagArt/:value',
        name: 'tagArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/homeArt/tagArt.vue')
      },
      {
        path: '/home/content/:_id',
        name: 'contentArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/contentView.vue')
      },
      {
        path: '/home/admin',
        name: 'adminArt',
        component: () => import(/* webpackChunkName: "about" */ '../views/adminView.vue'),
        children: [
          {
            path: '/home/adminView/User',
            component: () => import(/* webpackChunkName: "about" */ '../views/adminArt/UserArt.vue')
          },
          {
            path: '/home/adminView/text',
            component: () => import(/* webpackChunkName: "about" */ '../views/adminArt/textArt.vue')
          },
          {
            path: '/home/adminView/msg',
            component: () => import(/* webpackChunkName: "about" */ '../views/adminArt/msgArt.vue')
          },
          {
            path: '/home/adminView/comments',
            component: () => import(/* webpackChunkName: "about" */ '../views/adminArt/commentsArt.vue')
          },
          {
            path: '/home/adminView/account',
            component: () => import(/* webpackChunkName: "about" */ '../views/adminArt/accountArt.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 配置导航守卫查看是否有本地数据
router.afterEach((to, from) => {
  if (!to.path.includes('admin')) return
  // 判断是否登录
  if (store.state.token) {
    if (to.path === '/home/admin') {
      if (store.state.user.make === 0) {
        router.push('/home/adminView/User')
      } else {
        router.push('/home/adminView/account')
      }
    }
  } else {
    Vue.prototype.$message.error('未登录')
    router.push(from.path)
    setTimeout(() => {
      location.reload()
    }, 500)
  }
})
export default router
