require("dotenv").config();

const webpack = require("webpack");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const modeSwitcher = (dev, prod) =>
  process.env.WEBPACK_MODE === "development" ? dev : process.env.WEBPACK_MODE === "production" && prod;

module.exports = {
  mode: process.env.WEBPACK_MODE,
  entry: "./src/index.js",
  devtool: "source-map",
  devServer: {
    host: "localhost",
    open: true,
    contentBase: path.resolve(__dirname, "public"),
    compress: true,
    port: process.env.PORT,
    historyApiFallback: true,
  },
  // cheap-module-source-map
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "static/bin/main.[contenthash].min.production.js",
    chunkFilename: "static/bin/chunk.[contenthash].min.production.js",
    sourceMapFilename: "static/bin/main.[contenthash].min.production.js.map",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "static/media/ico/sw",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: false,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxSize: 0,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      generateStatsFile: true,
      analyzerMode: "static",
      // analyzerMode: "server",
      statsFilename: "./report/stats-log.js",
      reportFilename: "./report/report-index.html",
    }),
    // For test pictures
    // new CopyPlugin({
    //   patterns: [
    //       {
    //         from: path.resolve(__dirname, "public", "./static/media"),
    //         to: "./static/media",
    //       },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "static/style/[contenthash]__style__[contenthash].css",
    }),
  ],
};
