define(function (require, exports, module) {
  $ = require('./jquery-1.10.2.min.js');
	var init = function () {
		// 不能写在$(function () {})里面
    function JSscreen () {
      $('#wrap').height($(window).height());
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
  }
	exports.indexJS = init;
});