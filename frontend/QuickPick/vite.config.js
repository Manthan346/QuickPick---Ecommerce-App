import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Temporarily disabled tailwindcss Vite plugin to diagnose startup failure
// import tailwindcss from '..tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  tailwindcss(),
   
  ],
  server: {port: 5173}
})
  
