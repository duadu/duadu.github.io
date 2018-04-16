define(function (require, exports, module) {
  $ = require('./jquery-1.10.2.min.js');
	var init = function () {
		// 不能写在$(function () {})里面
    var screntHeight = $(window).height();
    function JSscreen () {
      $('#wrap').height(screntHeight);
      $('html').css({
        'font-size': $(window).width() / 10,
        'width': '100%'
      });
      $('body').css({
        'font-size': $(window).width() / 10,
        'width': $(window).width()
      });
    }
    JSscreen();
    // 获取浏览器的前缀
    function _prefix (temp) {
      var aPrefix = ['webkit', 'moz', 'o', 'ms'];
      var props = '';
      for (var i = 0; i < aPrefix.length; i++) {
        props = aPrefix[i] + 'Transition';
        if (temp.css(props) !== undefined) {  // 判断 XXXtransition
          return '-' + aPrefix[i] + '-';
        }
      }
    }
    // 鼠标滚动
    var index = 0;
    $('#wrap').on('mousewheel DOMMouseScroll', function (e) {
      if (true) {
        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detial;
        var value = Math.max(-1, Math.min(1, delta));
        if (value > 0 && index) {  // 向上滚动时
          prev();
        } else if (value < 0) {  // 向下滚动时
          next();
        }
      }
    });
    function prev () {
      if (index > 0) {
        index --;
      }
      _scrollPage();
    }
    function next () {
      if (index < 7) {
        index ++;
      }
      _scrollPage();
    }
    // 滑动事件
    var canScroll = true;
    function _scrollPage () {
      canScroll = false;
      if (_prefix($('#wrap'))) {
        $('#content').css(_prefix($('#wrap')) + 'transition', 'all 500ms ease');
        $('#content').css(_prefix($('#wrap')) + 'transform', 'translate3d(0, -' + index * screntHeight + 'px, 0)');
      } else {
        var animateCss = {top: - dest.top};
        $('#content').animate(animateCss, 500, function () {
          canScroll = true;
        });
      }
    }
    // 案例展示
    // $('.section5_photo').click(function () {

    // });
  }
	exports.indexJS = init;
});