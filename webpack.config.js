var path = require("path");
var HtmlwebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require("webpack");
var merge = require("webpack-merge");

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
};

var common = {
  entry:PATHS.app,
  module:{
    loaders:[
      {
        test:/\.css$/,
        loaders:["style", "css"],
        include:PATHS.app
      }
    ]
  },
  plugins:[
    new HtmlwebpackPlugin({
      title: "Zi Blog App"
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};

if(TARGET === "start" || !TARGET){
  module.exports = merge(common, {
    devtool:"eval-source-map",
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
    ]
  })
}
