module.exports = {
  entry: './index.js', //entry point is in the root of the project folder
  mode: 'development',
  output: {
    path: __dirname, //bundle.js is in the root of the project folder
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
