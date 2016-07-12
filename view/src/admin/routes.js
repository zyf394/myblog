import Home from './page/Home.vue'
import Edit from './page/Edit.vue'
import Articles from './page/Articles.vue'

export default function (router) {
  router.map({
    '/': {
      component: Home,
      subRoutes: {
        '/edit': {
          component: Edit
        },
        '/edit/:id': {
          component: Edit
        },
        '/articles/': {
          component: Articles
        },
        '/articles/:id': {
          component: Articles
        }
      }
    }
  })
}
