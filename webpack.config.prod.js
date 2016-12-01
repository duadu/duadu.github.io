var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		vendor: ['vue', 'vuex', 'vue-router'],
		bundle: './src/index'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[hash:8].[name].js',
		publicPath: '/'
	},
	plugins: [
		//webpack自带插件：接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JOSN.stringify('production')
			}
		}),
		//压缩打包的js文件
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		//在多个入口文件之间可能公用一个模块时，对指定的chunks进行公共模块的提取
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',  //将公共模块提取，打包生成名为vendor.js
			minChunks: Infinity  //公共模块被使用的最小次数: 无穷大
		}),
		new ExtractTextPlugin('[hash:8].style.css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
      		favicon: path.join(__dirname, '/src/favicon.ico'),
     		title: "my blog with vue",
      		template: path.join(__dirname, '/index.html'),  //模板文件
      		inject: 'body',
      		hash: false,    //为静态资源生成hash值
      		minify: {    //压缩HTML文件
	        	removeComments: false,    //移除HTML中的注释
	        	collapseWhitespace: true    //删除空白符与换行符
	      	}
    	}),
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
	    	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) 
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
	resolve: {
	    root: path.resolve(__dirname, 'node_modules'),
	    extensions: ['','.js','.vue','.scss']
	}
}