var path = require('path');
var webpack = require('webpack');
//html-webpack-plugin：帮助生成HTML文件，在body元素中，使用script来包含所有你的webpack bundles，只需要在你的webpack配置文件中配置
var HtmlWebpackPlugin = require('html-webpack-plugin');
//extract-text-webpack-plugin: 把css从js中独立抽离出来
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// 将每个模块转化为字符串，使用eval包裹，并将打包前每个模块的sourcemap信息转换为Base64编码，拼接在每个打包后文件的结尾
	devtool: 'eval-source-map',
	debug: true,
	entry: ['./src/main'],
	output: {
		path: process.cwd(), //返回运行当前脚本的工作目录的路径
		filename: 'blunde.js',
		publicPath: '/'
	},
	plugins: [
		//extract-text-webpack-plugin的内置插件：OccurenceOrderPlugin，
		//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的的模块，并为他们分配最小的ID
		new webpack.optimize.OccurenceOrderPlugin(),
		//全局开启代码热替换，在这加上，就不用使用命令行了
		new webpack.HotModuleReplacementPlugin(),
		//跳出编译时出错的代码并记录，使编译后运行时的包不会发生错误
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			//添加特定的favicon路径到输出的HTML文件中
			favicon: path.join(__dirname, '/src/favicon.ico'),
			//用来生成页面的title元素
			title: 'my blog with vue',
			//模板文件路径，支持加载器，比如html!./index.html
			template: path.join(__dirname, '/index.html'),
			//注入所有的资源到特定的template或者templateContent中。值：true|'head'|'body'|false
			inject: true  //true or 'body': 所有的js资源将被放置到body元素的底部，'head'将放置到head元素中
		}),
		//参数一：是经过编译后通过style-loader单独提取出文件来
		//参数二：是用来编译代码的loader
		new ExtractTextPlugin('[hash:8].style.css', {
			allChunks: true
		})
	],
	module: {
		preLoaders: [{
			test: /\.js$/, 
			loader: "eslint-loader", 
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue', 
			include: path.join(__dirname,'src')
		}, {
			test: /\.js$/, 
			loader: 'babel', 
			exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
		}, {
			test: /\.css$/, 
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
		}, {
			test: /\.(jpe?g|png|gif)$/i, 
			loaders: [
        		'url?limit=10000&name=images/[hash:8].[name].[ext]',
        		'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        	]
		}, {
			test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
		}]
	},
	vue: {
		loaders: {
			js: 'babel!eslint'
		}
	},
	//QA工具，用来避免低级错误和统一代码的风格
	eslint: {
		configFile: './.eslintrc.json'
	},
	resolve: {
	    root: path.resolve(__dirname, 'node_modules'),
	    extensions: ['','.js','.vue','.scss']
	}
	//全局时，在根目录下新建独立文件.babelrc
	// babel: {
	// 	//用于设置开启的语法特性集合
 //     	presets: ['es2015','stage-0'],
 //     	//对es6的语法进行转换
 //     	plugins: ['transform-runtime'],
 //     	comments: false
 //  	}
}