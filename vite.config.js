import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  publicDir: false,
  plugins: [vue()],
  resolve: {
    alias: {
      '@packages': resolve(__dirname, 'packages')
    }
  },
  optimizeDeps: {
    // See: https://github.com/vueuse/vue-demi
    // When using with Vite, you will need to opt-out the pre-bundling to get vue-demi work properly by
    exclude: ['vue-demi']
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'packages/index.js'),
      name: 'MyVueUse',
      fileName: format => `my-vue-use.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
