import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    // Sem sourcemaps no build de produção (assets empacotados no app nativo).
    // Em desenvolvimento (`vite` / `vite build --mode development`) os sourcemaps
    // continuam disponíveis quando necessário.
    sourcemap: mode !== 'production'
  }
}))
