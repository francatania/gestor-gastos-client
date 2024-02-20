import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configuración para manejar rutas desconocidas redirigiendo a index.html
    historyApiFallback: true,
  }
})


