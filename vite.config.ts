import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  base: '/perf-tests-react-style-options',
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      'react-dom/client': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling'
      ,
    },
  },
})
