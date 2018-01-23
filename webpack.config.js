const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vueConfig = require('./vue-loader.config');
let extractSCSS = new ExtractTextPlugin('style.css');
let vueSCSS = new ExtractTextPlugin('[name].css');
vueConfig.loaders = {
  sass: vueSCSS.extract({
    loader: "css-loader!sass-loader",
    fallbackLoader: "vue-style-loader"
  })
}
module.exports = {
  entry: {
    hire: "./src/entry/hire.js"
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js?[hash]',
    publicPath: '/dist/',
  },
  externals: {
    zepto: 'window.$'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueConfig
    }, {
      test: /\.scss$/i,
      loader: extractSCSS.extract(['css-loader','sass-loader','autoprefixer-loader'])
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader!autoprefixer-loader"
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {

      }
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: 'file-loader?limit=8192'
    }]
  },
  plugins: [
    extractSCSS,
    vueSCSS
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 8082,
    proxy: {
      '/genuine/': {
        // target: 'http://quality.pinyxian.com:8082/',
        target: 'http://192.168.10.12:8082/',
        pathRewrite: {'^/genuine' : '/genuine'},
        changeOrigin: true
      }
    }
  },
  devtool: 'inline-source-map'
}
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map' 
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}