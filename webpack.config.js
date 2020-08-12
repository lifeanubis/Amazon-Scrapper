const webpack = require("webpack")
const path = require("path")
const fs = require("fs")

const NodemonPlugin = require("nodemon-webpack-plugin")

/*
  ======================================
    This file is necessary for build
    steps or debugging, so if you're
    a beginner in programming and don't
    know what this file does, just
    don't delete it.
  ======================================
*/

module.exports = (environment) => ({
  mode: environment.mode,
  target: "node",
  entry: "./src",
  stats: "none",
  output: {
    path: path.join(__dirname, "build"),
    filename: "samosa"
  },
  externals: [require("webpack-node-externals")()],
  plugins: [new NodemonPlugin(), new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })],
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
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
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader"
      }
    ]
  }
})
