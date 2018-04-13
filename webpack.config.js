const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts.js');

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack demo'
      })
    ]
  }
]);

const productionConfig = merge([
  parts.extractCss({
    use: ['css-loader','postcss-loader', 'less-loader']
  })
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCss()
]);

module.exports = env => {
  let _out;

  if (env === 'production') {
    _out = merge(commonConfig, productionConfig, {mode:env});
  }

  if (env === 'debug') {
    _out = merge(commonConfig, productionConfig, {mode:'development'});
  }

  if (env === 'development') {
    _out = merge(commonConfig, developmentConfig, {mode:env});
  }

  return _out;
}
