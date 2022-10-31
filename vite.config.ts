import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import macrosPlugin from "vite-plugin-babel-macros"

export default defineConfig({
  base: '/perf-tests-react-style-options/',
  plugins: [
    macrosPlugin(),
    react(),
    vanillaExtractPlugin()
  ],
  resolve: {
    alias: {
      'react-dom/client': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },

})
