import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/mainPage/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/detail',
      name: 'detail',
      component: require('@/components/editPage/Detail').default
    },
    {
      path: '/main',
      name: 'main',
      component: Home
    }
  ]
})
