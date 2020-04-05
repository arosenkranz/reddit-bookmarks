const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // setup dev server
  devServer: {
    hot: true,
    contentBase: './dist',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    },
  },

  // this will tell me exactly where my errors occur
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Reddit Bookmarks',
      template: path.resolve(__dirname, 'src/assets/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
      chunks: ['app'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
