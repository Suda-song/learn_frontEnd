// 1. Tree Shaking - 移除未使用的代码
// ❌ 不好的导入方式
import * as _ from 'lodash'
_.debounce(fn, 300)

// ✅ 按需导入
import { debounce } from 'lodash'
// 或使用 lodash-es
import debounce from 'lodash-es/debounce'

// 2. 动态导入 - 代码分割
// ❌ 同步导入大文件
import Chart from 'chart.js'

// ✅ 动态导入
const loadChart = async () => {
  const { default: Chart } = await import('chart.js')
  return Chart
}

// 3. 条件导入 - 只在需要时加载
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  import('vconsole').then(({ default: VConsole }) => {
    new VConsole()
  })
}

// 构建工具的配置webpack.config.js
module.exports = {
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all'
        }
      }
    },
    // 压缩代码
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除console
            drop_debugger: true // 移除debugger
          }
        }
      })
    ]
  },
  
  // 外部依赖 - CDN 引入
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'vue': 'Vue'
  },
  
  // 开启 gzip 压缩
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    })
  ]
}
