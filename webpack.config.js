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

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  })
]);


module.exports = env => {
  const _out;

  if (env === 'production') {
    _out = merge(commonConfig, productionConfig, {mode:env});
  }

  _out = merge(commonConfig, developmentConfig, {mode:env});

  return _out;
}
