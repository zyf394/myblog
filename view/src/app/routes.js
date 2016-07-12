import Home from './page/Home'
import Profile from './page/Profile'
import About from './page/About'
import Article from './page/Article'

export default function (router) {
  router.map({
    '/': {
      component: Home
    },
    '/profile': {
      component: Profile
    },
    '/about': {
      component: About
    },
    '/article/:id': {
      component: Article
    }
  })
}
