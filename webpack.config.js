const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')

const mode = process.env.NODE_ENV || 'production'
const prod = mode === 'production'
const publicPath = '/'
const buildPath = path.join(__dirname, 'build', publicPath).replace(/\/$/, '')

const devPlugins = [
  new Serve({
    port: 8000,
    client: {
      retry: true,
    },
    // Remove liveReload when the following issue is resolved:
    // https://github.com/sveltejs/svelte-loader/issues/92
    liveReload: true,
    historyFallback: {
      index: path.join(publicPath, 'index.html'),
    },
    static: [
      buildPath,
    ],
  }),
]

const devEntries = [
  'webpack-plugin-serve/client',
]

module.exports = {
  mode,
  watch: !prod,
  devtool: !prod && 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index_template.ejs',
      filename: 'index.html',
    }),
    ...(!prod ? devPlugins : []),
  ],
  entry: {
    bundle: [
      './src/main.js',

      ...(!prod ? devEntries : {}),
    ],
  },
  output: {
    path: buildPath,
    publicPath,
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.svelte'],
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !prod,
              reloadAll: !prod,
            },
          },
          'css-loader'
        ]
      }
    ]
  },
}
