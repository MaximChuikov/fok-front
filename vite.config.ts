import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgrPlugin from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        exportType: 'default',
        icon: true,
      },
    }),
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
function svgr(arg0: {
  // Опции (необязательно)
  svgrOptions: { icon: boolean }
}): import("vite").PluginOption {
  throw new Error('Function not implemented.')
}

