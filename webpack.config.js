const path = require('path');

const SRC_DIR = path.join(__dirname, 'client');
const DIST_DIR = path.join(__dirname, 'public');

module.exports = {
  entry: path.resolve(SRC_DIR, 'component/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'client'),
        // exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/react', '@babel/env'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
};