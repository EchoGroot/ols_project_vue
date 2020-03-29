import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from './components/welcome.vue'
import personalcenter from './components/personalcenter.vue'
import personalinfo from './components/personalinfo.vue'
import releasetasklist from './components/releasetasklist.vue'
import acceptetasklist from './components/acceptetasklist.vue'
import changepassword from './components/changepassword.vue'
import showimagelabel from './components/showimagelabel.vue'
import imagelabelhome from './components/imagelabelhome.vue'
import imagelabel from './components/imagelabel.vue'
import imagelabel1 from './components/imagelabel1.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/personalcenter' },
  { path: '/welcome', component: welcome },
  { path: '/showimagelabel', component: showimagelabel },
  { path: '/imagelabel', component: imagelabel },
  { path: '/imagelabel1', component: imagelabel1 },
  { path: '/imagelabelhome', component: imagelabelhome },
  {
    path: '/personalcenter',
    component: personalcenter,
    children: [
      { path: '/', redirect: '/personalinfo' },
      { path: '/personalinfo', component: personalinfo },
      { path: '/acceptetasklist', component: acceptetasklist },
      { path: '/releasetasklist', component: releasetasklist },
      { path: '/changepassword', component: changepassword }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
