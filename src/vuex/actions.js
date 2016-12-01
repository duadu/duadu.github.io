import api from '../api'
import * as types from './types'
// import { signOut } from '../utils/authService'

export const getTagList = ({ dispatch }) => {
  api.getTagList().then(response => {
  	console.log(response)
    if (!response.ok) {
      return dispatch(types.GET_TAG_LIST_FAILURE)
    }
    dispatch(types.GET_TAG_LIST_SUCCESS, {
      tagList: response.data.data
    }, response => {
      dispatch(types.GET_TAG_LIST_FAILURE)
    })
  })
}
export const getArticleList = ({ dispatch }, options, isAdd) => {
  dispatch(types.REQUEST_ARTICLE_LIST)
  api.getFrontArticleList(options).then(response => {
    if(!response.ok){
      return dispatch(types.GET_ARTICLE_LIST_FAILURE)
    }
    const json = response.data
    const isMore = !(json.data.length < options.itemsPerPage)
    isAdd
      ? dispatch(types.ADD_ARTICLE_LIST,{
        articleList: json.data,
        isMore:isMore
      })
      : dispatch(types.ARTICLE_LIST,{
        articleList: json.data,
        isMore:isMore
      })
  }, response => {
    dispatch(types.GET_ARTICLE_LIST_FAILURE)
  })
}
//更改options
export const changeOptions = ({ dispatch }, options) => {
  dispatch(types.CHANGE_OPTIONS, {
    options: options
  })
}