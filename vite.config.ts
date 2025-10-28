import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes process.env available in the client code
    // Vercel will replace process.env.API_KEY with your environment variable at build time
    'process.env': process.env
  }
})
