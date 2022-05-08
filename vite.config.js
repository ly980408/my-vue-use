import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
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
  }
})
