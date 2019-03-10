const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app.ts',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../wwwroot')
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new webpack.DefinePlugin({
      __BUILD__:
        process.env.APPVEYOR_BUILD_NUMBER
          ? JSON.stringify(process.env.APPVEYOR_BUILD_NUMBER)
          : '\"local\"'
    })
  ],

  stats: {
    all: false,
    assets: true,
    errors: true,
    errorDetails: true,
    version: true,
    warnings: true
  }
};