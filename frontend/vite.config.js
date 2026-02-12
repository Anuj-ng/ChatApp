import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   server: {
    host: '0.0.0.0', // or simply host: true
    port: 5173, // Optional: specifies the port
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  tailwindcss(),
  ],
})
