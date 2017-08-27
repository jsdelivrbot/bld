import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} from 'webpack';

const WDS_PORT = 1234;
const title = 'Minimal redux router hot demo';


export default {
  "entry": [
    "react-hot-loader/patch",
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],

  "output": {

    "publicPath": "/",
    "filename": "bundle.js"
  },
  "devtool": "sourcemap",
  "module": {
    "rules": [{
        "test": /\.jsx?$/,
        "exclude": /(node_modules)/,
        "loader": "babel-loader",
        "query": {
          "babelrc": false,
          "plugins": ["transform-decorators-legacy"],
          "presets": [
            "stage-0", "react", ["env", {
              "modules": false
            }]
          ]
        }
      },
      {
        "test": /\.s?css$/,
        "use": ["css-hot-loader"].concat(ExtractTextPlugin.extract({
          "use": ["css-loader", "sass-loader"]
        }))
      }

    ]
  },
  "plugins": [new HtmlWebpackPlugin({
      title,
      "template": "./src/my-index.ejs",
    }),
    new ExtractTextPlugin({
      "filename": "./style/styles.css"
    }),

    new DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
      __TITLE__: `'${title}'`
    }),

    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()


  ],
  "resolve": {
    "extensions": [".js", ".jsx"],
  },
  "devServer": {
    "port": WDS_PORT,
    "hot": true,
    "historyApiFallback": true
  }

};
