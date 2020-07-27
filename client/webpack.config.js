const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // setup dev server
  devServer: {
    hot: true,
    contentBase: './dist',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001'
      }
    }
  },

  // this will tell me exactly where my errors occur
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Reddit Bookmarks',
      template: path.resolve(__dirname, 'src/assets/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
      chunks: ['app']
    }),
    new WebpackPwaManifest({
      name: 'Reddit Bookmarks',
      short_name: 'Reddit Bookmarks',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'anonymous'
      // icons: [
      //   {
      //     src: path.resolve('src/assets/icon.png'),
      //     sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      //   },
      //   {
      //     src: path.resolve('src/assets/large-icon.png'),
      //     size: '1024x1024' // you can also use the specifications pattern
      //   },
      //   {
      //     src: path.resolve('src/assets/maskable-icon.png'),
      //     size: '1024x1024',
      //     purpose: 'maskable'
      //   }
      // ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};
