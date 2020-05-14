const merge = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({ title: "Project X" }),
  ],
})
