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
        content: '#3F51B5'
      },  {
        name: 'mobile-web-app-capable',
        content: 'yes'
      }, {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }, {
        name: 'apple-mobile-web-app-status-bar-style',
        content: '#3F51B5'
      }],
      mobile: true,
      links: [
        '//fonts.googleapis.com/css?family=Short+Stack'
      ],
      scripts: [
        '//cdn.jsdelivr.net/npm/react@16.7.0/umd/react.production.min.js',
        '//cdn.jsdelivr.net/npm/react-dom@16.7.0/umd/react-dom.production.min.js'
      ]
      // headHtmlSnippet: '<script>document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px"</script>'
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
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
