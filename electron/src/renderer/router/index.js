import Vue from 'vue'
import Router from 'vue-router'

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
      path: '/home',
      name: 'home',
      component: require('@/components/mainPage/Home').default
    }
  ]
})
