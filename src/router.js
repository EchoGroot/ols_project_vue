import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from './components/welcome.vue'
import personalcenter from './components/personalcenter.vue'
import personalinfo from './components/personalinfo.vue'
import acceptfinish from './components/acceptfinish.vue'
import acceptnotfinish from './components/acceptnotfinish.vue'
import releasefinish from './components/releasefinish.vue'
import releasenotfinish from './components/releasenotfinish.vue'
import changepassword from './components/changepassword.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/personalcenter' },
  { path: '/welcome', component: welcome },
  {
    path: '/personalcenter',
    component: personalcenter,
    children: [
      { path: '/', redirect: '/personalinfo' },
      { path: '/personalinfo', component: personalinfo },
      { path: '/acceptfinish', component: acceptfinish },
      { path: '/acceptnotfinish', component: acceptnotfinish },
      { path: '/releasefinish', component: releasefinish },
      { path: '/releasenotfinish', component: releasenotfinish },
      { path: '/changepassword', component: changepassword }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
