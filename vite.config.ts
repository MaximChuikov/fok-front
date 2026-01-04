import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~/app': path.resolve(__dirname, './src/app'),
      '~/pages': path.resolve(__dirname, './src/pages'),
      '~/widgets': path.resolve(__dirname, './src/widgets'),
      '~/entities': path.resolve(__dirname, './src/entities'),
      '~/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
