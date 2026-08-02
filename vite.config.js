import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/execute': {
        target: 'https://wandbox.org',
        changeOrigin: true,
        rewrite: () => '/api/compile.json',
      },
    },
  },
})

