//process模块：用来与当前进程互动，可以通过全局变量process访问，不必使用require命令来加载
//process.env：指向当前shell的环境变量
//通过NODE_ENV来设置环境变量（默认development）
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') { //生产环境
	module.exports = require('./webpack.config.prod');
} else { //开发环境
	module.exports = require('./webpack.config.dev');
}