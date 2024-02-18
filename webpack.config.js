const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dict'),
        filename: 'main.js'
    },
    module: {
        rules: [
          {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test:/\.css$/,
            use:['style-loader','css-loader']
          },
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        new Dotenv()
    ]
}