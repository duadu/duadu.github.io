import Vue from 'vue'  //整个模块导出的时候（export default), Vue不用加{}
import VueRouter from 'vue-router'
//vue验证器
import VueValidator from 'vue-validator'
import store from './vuex/store'
import configRouter from './routes'
//通过在一个动态注册的模块中管理应用的路由状态，从而将vue-router和vuex集成
import { sync } from 'vuex-router-sync'  //模块定义的时候写法：exports.sync
import App from './components/App.vue'
import filters from './utils/filters'
import './css/reset.css'
import './css/index.css'

Vue.use(VueRouter)
Vue.use(VueValidator)
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const router = new VueRouter({
  history: true,  //2.0移除，改为下面的写法
  // mode: 'history',
  saveScrollPostion: true,  //2.0移除，替换为scrollBehavior
  //scrollBehavior：滚动行为，接受一个函数，返回路由导航时控制页面如何滚动的规则
  // scrollBehavior,  //用起来更灵活，
  suppressTransitionError: true  //因为钩子函数的系统简化而在2.0移除
})
configRouter(router)
sync(store, router)

router.start(Vue.extend(App), '#root')
window.router = router