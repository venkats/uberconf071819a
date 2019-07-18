const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', 
  output: {
    path: path.resolve(process.cwd(), 'public')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
          loader: "file-loader",
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: './src/style.css' }
    ])
  ]
};
