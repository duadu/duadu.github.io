<!-- Home -->
<template>
  <div id="navbar" class="navbar-box navbar-skin clearfix">
		<div class="navbar-logo fl">
			<a class="logo" :class="{'active':$route.name !== 'apps'}" v-link="{ path: '/' }" title="首页">
				<span class="du1">D</span>
				<span class="du2">u</span>
				<i>A</i>
				<span class="du3">D</span>
				<span class="du4">u</span>
			</a>
		</div>
			<!-- <li>
				<a :class="{'active': (options.sortName == 'publish_time')}" @click.prevent="changeSort('publish_time')" href="javascript:;">最新</a>
			</li> -->
		<Tags class="fr" :tag-list="tagList" :options="options" is-fetching="isFetching"></Tags>
	</div>
	<div id="cantainer">
		<Articles :article-list="articleList"></Articles>
		<Loadmore v-if="articleList.length > 0 && isMore" :options="options" :is-more="isMore"></Loadmore>
	</div>
</template>

<script>
import Tags from './tag.vue'
import Articles from './articles.vue'
import Loadmore from './loadmore.vue'
import { getTagList, getArticleList, changeOptions } from '../../vuex/actions'
export default {
  components: {
  	Tags,
  	Articles,
  	Loadmore
  },
  vuex: {
    getters: {
    	tagList: function ({tagList}) {
    		return tagList.items
    	},
      //（与上同） tagList: ({tagList}) => tagList.items,
      options: ({options}) => options.item,
      articleList: ({articleList}) => articleList.items,
      isMore: ({articleList}) => articleList.isMore,
      isFetching: ({articleList}) => articleList.isFetching
    },
    actions: {
      getTagList,
      getArticleList,
      changeOptions
    }
  },
  created () {
    if (this.tagList.length < 1) {
      this.getTagList()
    }
    if (this.articleList.length < 1) {
    	this.getArticleList(this.options)
    }
  },
  methods: {
    changehandle: function (options, isAdd = false) {
      this.changeOptions(options)
      this.getArticleList(this.options, isAdd)
      this.$children[1].newLoad = !isAdd
    }
  }
}
</script>

<style>

</style>


<!-- 2016.11.16 如有数量差异，请联系涂希言。 -->