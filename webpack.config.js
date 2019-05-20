const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      files: ["./dist/**.html","./dist/**.css"],
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    new ExtractTextPlugin('styles.css', {
      disable: process.env.NODE_ENV === 'development',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        }),
      },
    ]
  }
};