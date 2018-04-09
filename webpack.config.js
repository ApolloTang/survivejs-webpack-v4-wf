const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack demo'
    })
  ]
}
