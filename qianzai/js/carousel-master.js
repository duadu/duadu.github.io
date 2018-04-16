;(function ($) {
  // 定义私有方法,获取浏览器的前缀
  var _prefix = (function (temp) {  //temp: dom元素
    var aPrefix = ['webkit', 'moz', 'o', 'ms'];
    var props = '';
    for (var i in aPrefix) {
      props = aPrefix[i] + 'Transition';
      if (temp.style[props] !== undefined) {  // 判断 XXXtransition
        return '-' + aPrefix[i] + '-';
      }
    }
    return false;
  })(document.createElement(PageSwitch));
  var PageSwitch = (function () {
    function PageSwitch (element, options) {
      this.settings = $.extend(true, $.fn.PageSwitch.defaults, options||{}); // jQuery的extend作用：将用户自定义的插件参数与插件的默认参数合并
      this.element = element;
      console.log(element)
      this.init();  // 初始化插件
    }
    PageSwitch.prototype = {
      // 实现：初始化dom结构、布局、分页及事件绑定
      init: function () {  // 公有init()
        var me = this;
        // 初始化dom结构
        me.selectors = me.settings.selectors;
        me.carousel = me.element;
        me.imgs = me.element.find(me.settings.selectors.imgs);
        me.img = me.imgs.find(me.settings.selectors.img);
        me.canScroll = true;   //是否滑动 
        // 初始化插件的几个属性
        me.direction = me.settings.direction == 'vertical' ? true : false;
        console.log(this)
        me.pagesCount = me.pagesCount();
        me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;
        if (!me.direction) {
          me._initLayout();
        }
        if (me.settings.pagination) {
          me._initPaging();
        }
        // 绑定事件
        me._initEvent();
      },
      // 获取滑动页面数量
      pagesCount: function () {
        console.log(this)
        var me = this;
      	return me.img.length;
      },
      // 获取滑动的宽度或高度
      switchLength: function () {
        var me = this;
        return me.direction ? me.element.horizontal : me.element.vertical;
      },
      // 主要针对横屏情况下进行页面布局
      _initLayout: function () {
        var me = this;
        var width = (me.pagesCount * 100) + '%';
        var cellWidth = (100/me.pagesCount).toFixed(2) + '%';  // .toFixed(2): 取两位小数
        me.carousel.width(width);
        me.img.width(cellWidth).addClass('fl');
      },
      // 实现分页的dom结构及css样式
      _initPaging: function () {
        var me = this;
        var pageClass = me.settings.selectors.page.substring(1);  // 去掉‘.’
        me.activeClass = me.settings.selectors.active.substring(1);
        var pageHtml = '<ul class=' + pageClass + '><li class=' + me.activeClass + '></li>';
        for (var i = 0; i < me.pagesCount - 1; i++) {
          pageHtml += '<li></li>';
        }
        pageHtml += '</ul>';
        me.element.append(pageHtml);
        var pages = me.element.find(me.selectors.page);
        if (!me.direction) {
          pages.addClass('horizontal');  // 横 horizontal
        } else {
          pages.addClass('vertical');   // 竖 vertical
        }
      },
      // 分页事件
      _pageHandler: function () {
        var me = this;
        var pages = me.element.find(me.selectors.page);
        me.pageItem = pages.find('li');
        me.pageItem.removeClass(me.activeClass);
        me.pageItem.eq(me.index).addClass(me.activeClass);
      },
      // 初始化插件事件
      _initEvent: function () {
        var me = this;
        // 点击事件
        me.element.on('click', me.selectors.page + ' li', function () {
          me.index = $(this).index();
          me._scrollPage();
        });
        // 鼠标滚动事件  mousewheel: 其他浏览器; DOMMouseScroll： 火狐浏览器
        me.element.on('mousewheel DOMMouseScroll', function (e) {
          if (true) {
            var delta = e.originalEvent.wheelDelta || -e.originalEvent.detial;
            var value = Math.max(-1, Math.min(1, delta));
            if (value > 0 && (me.index)) {  // 向上滚动时
              me.prev();
            } else if (value < 0) {  // 向下滚动时
              console.log(value, me.index, (me.pagesCount - 1));
              me.next();
            }
          }
        });
        // 键盘事件
        if (me.settings.keyboard) {
          $(window).on('keydown', function (e) {
            var keyCode = e.keyCode;
            if (keyCode == 37 || keyCode == 38) {
              me.prev();
            } else if (keyCode == 39 || keyCode == 40) {
              me.next();
            }
          });
        }
        // 当窗口改变大小时
        $(window).resize(function () {
          var currentLength = me.switchLength();   // 获取当前页面的高度或宽度
          // 当前页面相对于文档的坐标值
          var offset = me.settings.direction ? me.img.eq(me.index).offset().top : me.img.eq(me.index).offset().left;

        });
        // transitionend 事件在 CSS 完成过渡后触发
        me.imgs.on('transitionend webkitTransitionEnd oTransitionend otransitionend', function () {
          me.canScroll = true;
          if(me.settings.callback && $.type(me.settings.callback) == 'function') {
            me.settings.callback();
          }
        });
      },
      // 向上滑动一页
      prev: function () {
        var me = this;
        if (me.index > 0) {
          me.index --;
        } else if (me.settings.loop) {
          me.index = me.pagesCount - 1;
        }
        me._scrollPage();
      },
      // 向下滑动一页
      next: function () {
        var me = this;
        if (me.index < me.pagesCount - 1) {
          me.index ++;
        } else if (me.settings.loop) {
          me.index = 0;
        }
        me._scrollPage();
      },
      // 滑动动画
      _scrollPage: function () {
        var me = this;
        var dest = me.img.eq(me.index).position();  // position()获取相对于它最近的具有相对位置(position:relative或position:absolute)的父级元素的距离，如果找不到这样的元素，则返回相对于浏览器的距离。
        var imgHeight = me.img.eq(0).height();
        if (!dest) {
          return;
        }
        me.canScroll = false;
        if (_prefix) {
          me.imgs.css(_prefix + 'transition', 'all ' + me.settings.duration + 'ms ' + me.settings.easing);
          var translate = me.direction ? 'translateY(-' + dest.top + 'px)' : 'translateX(-' + dest.left + 'px)';
          me.imgs.css(_prefix + 'transform', translate); 
        } else {
          var animateCss = me.direction ? {top: - dest.top} : {left: - dest.left};
          me.imgs.animate(animateCss, me.settings.duration, function () {
            me.canScroll = true;
            if(me.settings.callback && $.type(me.settings.callback) == 'function') {
              me.settings.callback();
            }
          });
        }
        me._pageHandler();
      }
    }
    return PageSwitch;
  })();
  // 在jQuery的原型下挂载此方法
  $.fn.PageSwitch = function (options) { 
    // fn相当于prototy
    //return: 实现链式调用;  each(): 对每个元素操作
    return  this.each(function () {
      var me = $(this);
      var instance = me.data('PageSwitch');  // 存放插件的实例
      // 判断该实例是否为空
      if (!instance) {
      	instance = new PageSwitch(me, options);
      	me.data('PageSwitch', instance);
      }
      // 判断用户传递的参数options的类型，如果是字符串，就实现方法的调用
      if ($.type(options) === 'string') {
      	return instance[options]();  //这样就可以在插件外部通过配置变量来实现方法的调用
      	// $('div').PageSwitch('init');   这样就可以调用init()了
      }
    });
  }
  // 定义默认配置参数
  $.fn.PageSwitch.defaults = {
  	selectors: {
      carousel: '#carousel',
      imgs: '.imgs',
      img: '.img',
      page: '.page',
      active: '.active'
  	},
  	index:0,
  	easing: 'ease',
  	duration: 500,  // 页面滑动动画的时间
  	loop: false,  // 是否循环播放
  	pagination: true, // 是否进行分页处理
  	keyboard: true, // 是否触发键盘事件
  	direction: 'horizontal', // 滑动方向
  	callback: true  // 滑动后的回调函数
  }
})(jQuery)