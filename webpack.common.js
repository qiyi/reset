const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextWebpackPlugin("styles.css"),
    new HtmlWebpackPlugin({
      title: "iSouth",
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      meta: [{
        name: 'theme-color',
        content: 'rgb(10, 134, 149)',
      }],
      mobile: true,
      links: [
        '//fonts.googleapis.com/css?family=Short+Stack'
      ],
      scripts: [
        '//unpkg.com/react@16/umd/react.production.min.js',
        '//unpkg.com/react-dom@16/umd/react-dom.production.min.js'
      ]
      // headHtmlSnippet: '<script>document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px"</script>'
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract(['css-loader'])
    },{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },{
      test: /\.tsx?$/,
      use: ['ts-loader'],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};