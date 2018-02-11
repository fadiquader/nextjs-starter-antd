const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  webpack: (config, { dev, isServer }) => {
    config.node = {
      fs: "empty"
    };

    let loaders = [];
    let lessUse = [];
    const cssLoader = {
      loader: isServer ? 'css-loader/locals' : 'css-loader',
      options: {
        modules: false,
        minimize: !dev,
        sourceMap: dev,
        importLoaders: 1
      }
    }

    let postcssLoader = {
      loader: 'postcss-loader'
    }

    let lessLoader = {
      loader: 'less-loader'
    }

    let extractLESSPlugin = new ExtractTextPlugin({
      filename: 'static/style-ant.css',
    });
    let extractCSSPlugin = new ExtractTextPlugin({
      filename: 'static/style.css',
      disable: dev
    });
    config.plugins.push(extractLESSPlugin)
    config.plugins.push(extractCSSPlugin)
    //
    // if (!extractCSSPlugin.options.disable) {
    //   extractCSSPlugin.options.disable = dev
    // }
    // if (!extractLESSPlugin.options.disable) {
    //   extractLESSPlugin.options.disable = dev
    // }

    if (isServer && cssLoader.options.modules) {
      lessUse = [cssLoader, postcssLoader, lessLoader].filter(Boolean)
    } else if(isServer && !cssLoader.options.modules) {
      lessUse = ['ignore-loader']
    } else {
      lessUse = extractLESSPlugin.extract({
        use: [cssLoader, postcssLoader, lessLoader].filter(Boolean),
        // Use style-loader in development
        fallback: {
          loader: 'style-loader',
          options: {
            sourceMap: dev,
            importLoaders: 1
          }
        }
      });
    }
    // const exractCssPlugin = extractCss.extract({
    //   use: [...loaders].filter(Boolean),
    //   // Use style-loader in development
    //   fallback: {
    //     loader: 'style-loader',
    //     options: {
    //       sourceMap: dev,
    //       importLoaders: 1
    //     }
    //   }
    // });


    config.module.rules.push({
      test: /\.less$/,
      use: lessUse
    })
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

    // config.module.rules.push(
    //   {
    //     test: /\.(css|scss)/,
    //     loader: 'emit-file-loader',
    //     options: {
    //       name: 'dist/[path][name].[ext]'
    //     },
    //
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: 'babel-loader!raw-loader'
    //   },
    //   {
    //     test: /\.scss$/,
    //     loader: 'babel-loader!raw-loader!sass-loader'
    //   }
    // )
    return config
  }
}