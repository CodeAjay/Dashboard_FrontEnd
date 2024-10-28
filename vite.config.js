import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This option tells the server to fallback to index.html for SPA routing
    historyApiFallback: true,
  }
})
