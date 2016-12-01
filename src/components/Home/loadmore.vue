<template>
	<div class="load-more">
		<button class="loadButton" @click.prevent="addData()">加载更多</button>
	</div>
</template>

<script>
export default {
  props: ['articleList', 'isMore', 'options'],
  methods: {
  	addData: function () {
  		let currentPage = this.options.currentPage
  		this.$parent.changehandle({
  			currentPage: ++currentPage
  		}, true)
  	}
  }
}
</script>

<style>
.loadButton {
	width: 100px;
	height: 40px;
	border: 0;
	font-size: 16px;
	font-weight: bold;
	background: #fff;
	color: #170408;
	margin: 0 0 20px 333px;
}
</style>