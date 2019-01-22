const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: `${__dirname}/public/dist`,
      filename: 'bundle.js'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'eslint-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.(sass|scss|css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
      proxy: {
        '/api/*': {
          target: 'http://localhost:5000'
        },
        '/auth/google': {
          target: 'http://localhost:5000'
        }
      }
    }
  };
};
