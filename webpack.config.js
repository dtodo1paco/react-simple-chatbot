const webpack = require('webpack');
var path = require("path");
var autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const COMMON_CONFIG = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
            options: { hmr: true }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'), // eslint-disable-line
                  autoprefixer({
                    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie <9'],
                    flexbox: 'no-2009'
                  })
                ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname,'src/styles')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    extensions: [".css", ".js", ".jsx"],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  node: {
    fs: "empty"
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  }
};


module.exports = (env, argv) => {
    console.log("Running in ["+argv.mode+"] mode... env:" + JSON.stringify(env));
    let ret = COMMON_CONFIG;
    if (argv.mode === 'production') {
        ret.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js($|\?)/i,
                    cache: true,
                    parallel: true
                })
            ]
        }
        ret.devServer = {
            contentBase: './dist',
            hot: false
        };
        ret.watch = false;
    } else {
        ret.plugins = [new webpack.HotModuleReplacementPlugin()];
        ret.watch = true;
        ret.devServer = {
            contentBase: './dist',
            hot: true
        }
    }
    return ret;
}
