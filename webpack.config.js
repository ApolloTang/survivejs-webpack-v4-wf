const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const glob = require('glob')

const parts = require('./webpack.parts.js');

const PATHS = {
  app: path.resolve(__dirname, 'src'),
  fonts: path.resolve(__dirname, 'src/assets/fonts')
}


const optimization = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
}


const commonConfig = merge([
  {
    entry: [
      '@babel/polyfill', // required for asycn await
      PATHS.app
    ]
  },
  parts.loadJavaScript({
    include: PATHS.app,
    exclude: ['node_modules']
  }),
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack demo'
      })
    ]
  },
  parts.loadFonts({
    include: PATHS.fonts,
    options: {
      name: "fonts/[name].[ext]",
    }
  }),
]);


const productionConfig = merge([
  parts.extractCss(),
  parts.purifyCss({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    purifyOptions: {minify: true}
  }),
  optimization
]);


const debugConfig = merge([
  parts.extractCss(),
  parts.purifyCss({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  optimization
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
    _out = merge(commonConfig, debugConfig, {mode:'none'});
  }

  if (env === 'development') {
    _out = merge(commonConfig, developmentConfig, {mode:env});
  }

  return _out;
}
