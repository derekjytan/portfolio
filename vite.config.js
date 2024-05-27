import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  output: 'export',
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})

