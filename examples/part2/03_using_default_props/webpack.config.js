let webpack = require('webpack');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let context = path.join(process.cwd(), 'src');

let plugins = [
        new CopyWebpackPlugin([
            { from: 'index.html' },
            { from: 'style.css' }
        ])
    ];

let entry = {
  'lab': './lab.js'
};

let output = {
  path: path.resolve(process.cwd(), 'public'),
  filename: '[name].bundle.js',
  sourceMapFilename: '[name].map',
  chunkFilename: '[id].chunk.js'
};                

let resolve = {
  modules: [
    'node_modules',
    path.resolve(process.cwd(), 'src')
  ],
  extensions: ['.js', '.json']
};
  
let rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /(node_modules)/,
    query: {
      presets: ['latest', 'react', 'es2015', 'stage-3']
    }
  },
  {
    test: /\.js$/,
    use: 'source-map-loader',
    exclude: [
    ]
  },
  {
    test: /\.html$/,
    use: 'html-loader?attrs=false&caseSensitive&removeAttributeQuotes=false'
  }
]

module.exports = {
  mode: 'development',
  context: context,       
  plugins: plugins,
  resolve: resolve,
  entry: entry,
  output: output,
  module: { rules: rules }
};