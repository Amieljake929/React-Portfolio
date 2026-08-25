import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Ine-expose ang app sa local network
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // I-fo-forward ang /api requests kapag nagre-run ng Vercel CLI
        changeOrigin: true,
      },
    },
  },
})