import { resolve } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: {
      origin: '*'
    },
    proxy: {
      '/api': {
        target: 'http://8.218.223.118:9091',
        changeOrigin: true,
        cookieDomainRewrite: {
          "*": ''
        },
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
