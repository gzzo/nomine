import path from 'path'

export const getRules = () => [
  {
    test: /\.tsx?$/,
    exclude: {
      test: /node_modules/,
    },
    use: {
      loader: 'ts-loader',
    },
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
  },
  {
    test: /\.s?css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname),
          },
        },
      },
      'sass-loader',
    ],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ['file-loader'],
  },
]
