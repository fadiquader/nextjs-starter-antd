const path = require("path");

module.exports = {
  webpack: (config, { dev, isServer }) => {
    config.node = {
      fs: "empty"
    };

    // conf.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    // if(!dev) {
    //     conf.plugins.push(
    //         new BundleAnalyzerPlugin({
    //             // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
    //             analyzerMode: dev ? "server" : "static",
    //             analyzerHost: "127.0.0.1",
    //             analyzerPort: 8085,
    //             openAnalyzer: false
    //         })
    //     );
    // }

    // config.module.rules.push({
    //   test: /\.(sc|c)ss$/,
    //   use: [
    //     {
    //       loader: "emit-file-loader",
    //       options: {
    //         name: "dist/[path][name].[ext].js"
    //       }
    //     },
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         babelrc: false,
    //         extends: path.resolve(__dirname, "./.babelrc")
    //       }
    //     },
    //     "styled-jsx-css-loader",
    //     { loader: "postcss-loader", options: { sourceMap: false } },
    //     {
    //       loader: "sass-loader",
    //       options: {
    //         sourceMap: false
    //       }
    //     }
    //   ]
    // });
    // config.module.rules.push({
    //   test: /\.(le|c)ss$/,
    //   use: [
    //     {
    //       loader: "emit-file-loader",
    //       options: {
    //         name: "dist/[path][name].[ext].js"
    //       }
    //     },
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         babelrc: false,
    //         extends: path.resolve(__dirname, "./.babelrc")
    //       }
    //     },
    //     "styled-jsx-css-loader",
    //     { loader: "postcss-loader", options: { sourceMap: dev } },
    //     {
    //       loader: "less-loader",
    //       options: {
    //         sourceMap: false
    //       }
    //     }
    //   ]
    // });

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        },

      },
      {
        test: /\.css$/,
        loader: 'babel-loader!raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'babel-loader!raw-loader!sass-loader'
      }
    )
    return config
  }
}