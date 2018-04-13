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

      open: true,               // Open the page in browser
      // historyApiFallback: true, // use HTML5 API based routing

      overlay: true,            // cpature compoilation related warning/errors
      // [*] overlay does not seem to work possible related to
      //     https://github.com/smooth-code/error-overlay-webpack-plugin/issues/8
    }
  };
  return _out;
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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
              // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              // The disccus in the following ref is confusing:
              // https://github.com/webpack-contrib/css-loader/issues/228
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
});
