const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const glob = require('glob')

const parts = require('./webpack.parts.js');

const PATHS = {
  app: path.join(__dirname, 'src')
}

const commonConfig = merge([
  {
    entry: ['@babel/polyfill', PATHS.app]
  },
  parts.loadJavaScript({ include: PATHS.app }),
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack demo'
      })
    ]
  },
]);


const productionConfig = merge([
  parts.extractCss(),
  parts.purifyCss({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    purifyOptions: {minify: true}
  }),
]);


const debugConfig = merge([
  parts.extractCss(),
  parts.purifyCss({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
]);


const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCss(),
]);


module.exports = env => {
  let _out;

  if (env === 'production') {
    _out = merge(commonConfig, productionConfig, {mode:env});
  }

  if (env === 'debug') {
    _out = merge(commonConfig, debugConfig, {mode:'development'});
  }

  if (env === 'development') {
    _out = merge(commonConfig, developmentConfig, {mode:env});
  }

  return _out;
}
