//入口文件，在根组件调用，然后所有子组件可以共享数据
import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import tagList from './modules/tag.list'
import options from './modules/options'
import articleList from './modules/article.list'

const debug = process.env.NODE_ENV !== 'production'

//告诉vue使用vuex
Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
  modules: {
    tagList,
    options,
    articleList
  },
  strict: debug,
  middlewares
})