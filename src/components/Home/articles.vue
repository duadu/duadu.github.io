<template>
	<ul class="article-list">
		<li v-for="article in articleList" class="articleItem">
			<img :src="article.images.length ? article.images[0].url : '/src/img/logo.jpg'"/>
			<div class="articleContent">
				<span class="title"> {{ article.title }}</span>
				<span class="time">{{ article.publish_time | customTime }}</span>
				<ul class="watchMsg clearfix">
					<li class="visited clearfix fl">
						<i class="iconfont articleItemIcon fl">&#xe605;</i>
						<span class="count fl">{{ article.visit_count }}</span>
					</li>
					<li class="comment clearfix fl">
						<i class="iconfont articleItemIcon fl">&#xe612;</i>
						<span class="count fl">{{ article.comment_count }}</span>
					</li>
					<li class="like clearfix fl">
						<i class="iconfont articleItemIcon fl">&#xe60a;</i>
						<span class="count fl">{{ article.like_count }}</span>
					</li>
				</ul>
			</div>
		</li>
	</ul>
</template>

<script type="text/javascript">
var $items = [], cols = 5, colsHeightArr = {}, allHeightArr = {}, left = [0, 155, 310, 465, 620],addArticleListLength = 0
var WFFunction = function (newLoad){
  if (newLoad) {
    addArticleListLength = 0, $items = []
  }
  addArticleListLength = $items.length || 0
  $items = document.querySelectorAll('.articleItem')
  addArticleListLength = $items.length - addArticleListLength
  var is$items = function () {
    if ($items.length) {
      waterFall.getColorList()
      waterFall.arrange()
    } else {
      $items = document.querySelectorAll('.articleItem')
      this
    }
  }
  is$items()
}
WFFunction(true)

//瀑布流
var waterFall = {
  arrange: function () {
    var me = this
    var count = 0
    var isLoaded = false
    $items.forEach(function (ele, index) {
      ele.querySelector('img').onload = function() {  //onload: 图片加载之后执行
        if (ele.querySelector('img').complete) {  //complete: 图片显示出来之后执行
          count ++
          allHeightArr[index] = ele.offsetHeight
          //判断图片是否加载完成
          if (count == addArticleListLength) {
            isLoaded = true
          }
        }
      }
    })
    var timer = setInterval(function () {
      if (isLoaded) {
        clearInterval(timer)
        me.getColsHeightArr()
      }
    }, 10)
  },
  getColsHeightArr: function () {
    var me = this
    for (var i in allHeightArr) {
      if (i < cols) {
        colsHeightArr[i] = allHeightArr[i]
      }
    }
    for (var m = 0; m < $items.length; m++) {
      if (m < cols) {
        $items[m].style.top = 0
        $items[m].style.left = left[m] + 'px'
      } else {
        me.articleItemPost(m)
        if (m + 1 == $items.length) {
          document.querySelector('.article-list').style.height = me.getMaxHeightIndex().maxHeight + 30 + 'px'
        }
      }
    }
  },
  getMinHeightIndex: function () {
    var MinClos = {
      minHeight: 99999,
      minHeightIndex: -1
    }
    for (var i in colsHeightArr) {
      if (MinClos.minHeight > colsHeightArr[i]) {
        MinClos.minHeight = colsHeightArr[i]
      }
    }
    for (var j in colsHeightArr) {
      if (colsHeightArr[j] == MinClos.minHeight) {
        MinClos.minHeightIndex = j
      }
    }
    return MinClos
  },
  articleItemPost: function (i) {
    var me = this
    $items[i].style.top = me.getMinHeightIndex().minHeight + 5 +'px'
    $items[i].style.left = left[me.getMinHeightIndex().minHeightIndex] +'px'
    colsHeightArr[me.getMinHeightIndex().minHeightIndex] += allHeightArr[i] + 5
  },
  getMaxHeightIndex: function () {
    var MaxClos = {
      maxHeight: -1,
      maxHeightIndex: -1
    }
    for (var i in colsHeightArr) {
      if (MaxClos.maxHeight < colsHeightArr[i]) {
        MaxClos.maxHeight = colsHeightArr[i]
      }
    }
    for (var j in colsHeightArr) {
      if (colsHeightArr[j] == MaxClos.maxHeight) {
        MaxClos.maxHeightIndex = j
      }
    }
    return MaxClos
  },
  getColorList: function () {
    let colorList = ['#2d1219', '#cbc082', '#e23258', '#b7af02', '#67917b']
    $items.forEach(function (ele, index) {
      let colorIndex = Math.floor(Math.random() / 2 * 10)
      ele.style.background = colorList[colorIndex]
    })
  }
}
export default {
  props: ['articleList'],
  watch: {
    'articleList': 'addArticleList'
  },
  methods: {
    addArticleList: function () {
      WFFunction(this.newLoad)
    }
  }
}
</script>

<style>
.article-list {
  position: relative;
  width: 770px;
  color: #fff;
}
.articleItem {
  position: absolute;
  width: 150px;
}
.articleItem img {
  width: 150px;
}
.articleItem .articleContent {
  padding: 3px;
}
.articleItem .title {

}
.articleItem .time {
  display: block;
  font-size: 12px;
  margin: 5px 0 20px 0;
}
.articleItem .watchMsg {
}
.articleItem .watchMsg li {
	margin: 0 10px 0 0;
}
.articleItem .count, .articleItemIcon {
	font-family: 'Kalinga';
	font-size: 12px;
}
.articleItem:nth-child(5n) {
	margin: 0 0 5px 0;
}
.articleItem .watchMsg li:nth-child(3) {
	margin: 0;
}
</style>