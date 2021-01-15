const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const dotenv = require('dotenv-webpack');

const isLocal = process.env.NODE_ENV === 'local';

console.log(process.env.NODE_ENV);

module.exports = {
  mode: isLocal ? 'development' : 'production',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src', 'app'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.webpackCache')
            }
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new dotenv({
      path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    new ForkTsCheckerWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: false,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new NodemonPlugin(),
  ],
};