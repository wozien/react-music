/**
 * @see https://github.com/arackaf/customize-cra/blob/master/api.md
 **/

const path = require('path')
const {
  override,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra')

// 自定义配置
const devServerConfig = () => config => {
  return {
    ...config
  }
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
}