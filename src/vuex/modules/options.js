import { CHANGE_OPTIONS } from '../types'

const state = {
  item: {
    currentPage: 1,
    itemsPerPage: 10,
    sortName: 'publish_time',
    tagId: ''
  }
}
const mutations = {
  [CHANGE_OPTIONS](state, action) {
    state.item = {
      //不定参数：...后跟代表所有不定参数的变量名
      //在函数中使用命名参数同时接收不定数量的未命名参数
      ...state.item,
      ...action.options
    }
  }
}

export default {
  state,
  mutations
}