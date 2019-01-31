const path = require('path');

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

  stats: {
    all: false,
    assets: true,
    errors: true,
    errorDetails: true,
    version: true,
    warnings: true
  }
};