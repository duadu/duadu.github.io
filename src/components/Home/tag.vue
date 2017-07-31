<template>
	<ul class="sort-tags list-unstyled clearfix">
		<li class="navbarItem fl">
			<!-- <span class="line line1"></span> -->
			<a :class="{'active': (options.sortName == 'publish_time')}" href="javascript:;" @click.prevent="changeSort('publish_time')">最新</a>
			<!-- <span class="line line2"></span> -->
		</li>
		<li class="navbarItem fl">
			<!-- <span class="line line1"></span> -->
			<a :class="{'active': (options.sortName == 'visit_count')}" href="javascript:;" @click.prevent="changeSort('visit_count')">热门</a>
			<!-- <span class="line line2"></span> -->
		</li>
		<li class="navbarItem fl" v-for="tag in tagList">
			<!-- <span class="line line1"></span> -->
			<a href="javascript:;" :class="{'active': (options.tagId == tag._id)}" @click.prevent="changeTag(tag._id)">{{tag.name}}</a>
			<!-- <span class="line line2"></span> -->
		</li>
	</ul>
</template>

<script>
  export default {
    props: ['tagList', 'options', 'isFetching'],
    methods: {
      changeSort (sortName) {
        this.$parent.changehandle({
          'currentPage': 1,
          'sortName': sortName,
          'tagId': ''
        })
      },
      changeTag (tagId) {
        this.$parent.changehandle({
          'currentPage': 1,
          'sortName': '',
          'tagId': tagId
        })
      }
    }
  }
</script>

<style>
.navbarItem {
	position: relative;
	font-size: 0;
	margin: 0 0 0 10px;
}
.navbarItem .active {
	color: #efd700;
}
.navbarItem .line {
	display: inline-block;
	width: 1px;
	height: 60px;
	background: #fff;
}
.navbarItem .line1 {
	position: absolute;
	left: 7px;
}
.navbarItem .line2 {
	position: absolute;
	right: 7px;
}
.navbarItem a {
	display: inline-block;
	padding: 10px 25px;
	border: 1px solid #fff;
	border-radius: 10px;
	margin: 10px 0 0 0;
	color: #fff;
}
</style>