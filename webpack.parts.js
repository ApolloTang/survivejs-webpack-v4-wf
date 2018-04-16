const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCssPlugin = require('purifycss-webpack')

exports.devServer = ({ host, port } = {}) => {
  const _out = {
    devServer: {
      // Display only errors to reduce the amount of output.
      stats: "errors-only",

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || "0.0.0.0";
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST,   // Defaults to `localhost`
      port: process.env.PORT,   // Defaults to 8080

      // open: true,               // Open the page in browser
      // historyApiFallback: true, // use HTML5 API based routing

      overlay: true,            // cpature compoilation related warning/errors
      // [*] overlay does not seem to work possible related to
      //     https://github.com/smooth-code/error-overlay-webpack-plugin/issues/8
    }
  };
  return _out;
}

const cssLoaderConf = {
  loader: 'css-loader',
  options: {
    importLoaders: 2
    // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
    // The disccus in the following ref is confusing:
    // https://github.com/webpack-contrib/css-loader/issues/228
  }
}


exports.purifyCss = ({paths, purifyOptions} = {}) => {
  const _out = {
    plugins: [new PurifyCssPlugin({paths, purifyOptions})]
  }
  return _out
}


exports.loadCss = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include,
        exclude,
        use: [
          'style-loader',
          cssLoaderConf,
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
});


exports.extractCss = ({ include, exclude } = {}) => {
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed to extract from extracted chunks as well.
    allChunks: true,
    filename: "[name].css",
  });
  return {
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
             cssLoaderConf,
             'postcss-loader',
             'less-loader'
           ],
           fallback: "style-loader"
          }),
        },
      ]
    },
    plugins: [plugin],
  }
}


exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader",
      },
    ],
  },
});


exports.loadFonts = ({ include, exclude, options } = {}) => {
  const _out = {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
          include,
          exclude,
          use: {
            loader: "file-loader",
            options
          },
        },
      ],
    },
  }
  return _out
};
