import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base relativa: o build em dist/ funciona em qualquer caminho
// (github.io/<repo>/, file://, etc.)
export default defineConfig({
  plugins: [vue()],
  base: './',
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
})
