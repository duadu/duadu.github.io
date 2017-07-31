// api
import { TagResource, ArticleResource } from './resources'

export default {
  // localLogin: function (data) {
  //   return AuthResource.save({
  //     id: 'local'
  //   }, data)
  // },
  getTagList: function (data) {
    console.log(data)
    return TagResource.get({
      id: 'getFrontTagList'
    })
  },
  getFrontArticleList: function (options) {
    return ArticleResource.get({
      id: 'getFrontArticleList',
      ...options
    })
  }
}