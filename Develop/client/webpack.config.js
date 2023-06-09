const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
    new InjectManifest({
    swSrc:"./src-sw.js",
    swDesti:"src-sw.js"
    }),
    new HtmlWebpackPlugin({
      template:"./index.html",
      title:"AD Text Editor"}),
    new WebpackPwaManifest({
      fingerprints: false,
      inject:true,
      name: "AD Text Editor",
      description: "Insert your text here",
      start_url:"./",
      publicPath:"./",
      
      icons:[{
        src:path.resolve("src/images/logo.png"),
        sizes:[100,130,190,250,370,500],
        destination:path.join("assets","icons")
      }]
    })
  ],
    module: {
      rules: [{
      test:/\.css$/i,
      use:["style-loader", "css-loader"]
      },
      {test:/\.m?js$/,
      exclude:/node_modules/,
      use:{
        loader:'Babel-loader',
        options:{
          presets:["@babel/preset-env"],
          plugin:["@babel/plugin-proposal-object-rest-spread","@babel/transform-runtime"]
        }
       }}],
      },
  };
};
