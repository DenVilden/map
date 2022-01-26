const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CleanCss = require("clean-css")
const Autoprefixer = require("autoprefixer")
const PostcssNormalize = require("postcss-normalize")

module.exports = {
  entry: path.resolve(__dirname, "src", "index.jsx"),
  output: {
    filename: "main.js",
    path: path.resolve("dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { modules: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  Autoprefixer(),
                  PostcssNormalize({
                    forceImport: true,
                  }),
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "vendor.js",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: CleanCss,
      cssProcessorOptions: {
        level: {
          1: { specialComments: "none" },
          2: { all: true },
        },
      },
    }),
  ],
}
