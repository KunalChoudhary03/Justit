import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 5173,
    historyApiFallback: true, 
  },
  plugins: [react(),
     tailwindcss(),
  ],
})