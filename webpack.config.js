const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = env => {
  const filename = extension =>
    env.NODE_ENV === 'development'
      ? `[name].${extension}`
      : `[name].[contenthash:8].${extension}`

  return {
    output: {
      path: path.join(__dirname, '/dist'),
      filename: filename('js'),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
            },
            mangle: {
              safari10: true,
            },
          },
        }),
      ],
    },
    devServer: {
      port: 3003,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({template: './src/index.html'}),
      new MiniCssExtractPlugin({filename: filename('css')}),
      new CopyPlugin({
        patterns: [{from: './src/assets/images', to: 'images'}],
      }),
      new Dotenv(),
    ],
  }
}
