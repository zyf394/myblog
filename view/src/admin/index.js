import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import configRouter from './routes'
import Admin from './Admin'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  history: false
})

configRouter(router)

router.start(Vue.extend(Admin), '#root')

window.router = router
