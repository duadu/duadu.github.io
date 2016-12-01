var path = require('path'),
	gulp = require('gulp'),
	//按照gulp的统一规范打印错误日志
	gutil = require('gulp-util'),
	webpackDevServer = require('webpack-dev-server'),
	webpack = require('webpack'),
	//删除文件/文件夹
	del = require('del'),
	env = require('gulp-env'),
	//gulp执行任务排序
	gulpSequence = require('gulp-sequence'),
	//重启服务器
	nodemon = require('gulp-nodemon'),
	open = require('open');
var DEV_PORT = 3000,  //开发环境的端口号
	PROD_PORT = 8400;  //生产环境的端口号

// 创建一个'serve'任务
gulp.task('serve', function () {
	var webpackConfig = require('./webpack.config');
	var myConfig = Object.create(webpackConfig);
	//myConfig.entry数组的第一项加上'webpack/hot/only-dev-server'
	myConfig.entry.unshift('webpack/hot/only-dev-server');
	myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + DEV_PORT); //资源服务器地址
	new webpackDevServer(webpack(myConfig), {
		noInfo: false,
		hot: false,   //热更替
		inline: true,
		historyApiFallback: true,
		publicPath: myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(DEV_PORT, 'localhost', function (err) {
		if (err) {
			throw new gutil.PluginError('webpack-dev-server', err);
		}
		//打印结果自动带上时间前缀。支持多个参数，打印结果将会以空格的形式连接起来
		gutil.log('[webpack-dev-server]', '==> http:localhost' + 'DEV_PORT');
		open('http:localhost:' + DEV_PORT);
	});
});

//创建一个'clean'任务
gulp.task('clean', function () {
	del([path.join(__dirname, '/dist/*')]);
});

//创建一个'set-env-prod'任务
gulp.task('set-env-prod', function () {
	env({
		vars: {
			'NODE_ENV': 'production'
		}
	});
});

//创建一个'webpack'任务
gulp.task('webpack', function (callback) {
	var config = require('./webpack.config');
	webpack(config, function (err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err);
		}
		gutil.log('[webpack]',stats.toString({
			//output options
		}));
		callback();
	});
});

//创建一个'webpack:dist'任务
gulp.task('webpack:dist', gulpSequence('set-env-prod', 'webpack'));

//创建一个'build'任务
gulp.task('build', gulpSequence('clean', 'webpack:dist'));

//创建一个'nodemon'任务
gulp.task('nodemon', function () {
	nodemon({
		script: path.join(__dirname, '/server.js'),
		ext: 'js',
		watch: [
			path.join(__dirname, '/dist')
		],
		env: {
			'NODE_ENV': 'production',
			'PORT': PROD_PORT
		}
	});
});

//创建一个'serve:dist'任务
gulp.task('serve:dist', gulpSequence('build', 'nodemon'));