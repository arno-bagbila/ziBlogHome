var path = require("path");
var HtmlwebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require("webpack");

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
};

module.exports = {
  entry:PATHS.app,
  output: {
    path:PATHS.build,
    filename : "bundle.js"
  },
  devServer:{
    historyApiFallback:true,
    hot:true,
    inline:true,
    progress:true,

    //display only errors to reduce the amount output
    stats:"errors-only",

    //parse host and port from env so this is easy to customize
    host:process.env.HOST,
    port:process.env.PORT
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: "Zi Blog App"
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};
