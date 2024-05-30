import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'derektan12.github.io',
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})
