import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Home = () => import('../views/home/Home')
const Profile =() => import('../views/profile/Profile')
const Login =() => import('../views/login/Login')
const Locat =() => import('../views/locat/Locat')
const Seek =() => import('../views/search/Search')
const PersonalData =() => import('../views/profile/children/PersonalData')
const Register =() => import('../views/login/children/Register')
const Details =() => import('../views/details/Details')
const PersonalCollection =() => import('../views/profile/children/PersonalCollection')
const PersonalLikes =() => import('../views/profile/children/PersonalLikes')
const PersonalFootmark =() => import('../views/profile/children/PersonalFootmark')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/profile/:id',
    component: Profile
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Seek
  },
  {
    path: '/locat',
    component: Locat
  },
  {
    path: '/personaldata',
    component: PersonalData
  },
  {
    path: '/personalcollection',
    name: 'personalcollection',
    component: PersonalCollection
  },
  {
    path: '/personallikes',
    name: 'personallikes',
    component: PersonalLikes
  },
  {
    path: '/personalfootmark',
    name: 'personalfootmark',
    component: PersonalFootmark
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  base: '/tourist_guide/',
})

// 路由守卫
// router.beforeEach((to, from, next) => {

// })

export default router