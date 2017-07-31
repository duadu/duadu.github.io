import Vue from 'vue'
//跟jQuery的$.ajax类似
//用来和后端交互数据的。可放在created或者ready里面运行来获取或者更新数据
import VueResource from 'vue-resource'
import { API_ROOT } from '../config'
import {getCookie, signOut } from '../utils/authService'

Vue.use(VueResource)

//HTTP相关
Vue.http.options.crossOrigin = true  //跨域资源共享
Vue.http.options.credentials = true  //？？搜索不到相关资源？？

//interceptor拦截器：在请求发送前后做一些处理
Vue.http.interceptors.push((request, next) => {
  //请求发送前的处理逻辑
  //对请求体进行处理
  request.headers = request.headers || {}
  if (getCookie('token')) {
    request.headers.Autorization = 'Bearer' + getCookie('token').replace(/(^\")|(\"$)/g, '')
  }
  next((response) => {
    //请求发送后的处理逻辑
    //根据请求的状态，response参数会返回给successCallback或errorCallback
    //对响应的结果进行处理
    if (response.status === 401) {
      signOut()
      window.location.pathname = '/login'
    }
  })
})
//{/id}占位符
export const TagResource = Vue.resource(API_ROOT + 'tags{/id}')
//https://api.jackhu.top/tags/getFrontTagList
export const ArticleResource = Vue.resource(API_ROOT + 'article{/id}{/controller}')