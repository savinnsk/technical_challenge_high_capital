import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: true, // ou '0.0.0.0'
    port: 5173,
       proxy: {
      "/api": {
        target: "http://127.0.1:5201",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api")
      }},
  },

})
