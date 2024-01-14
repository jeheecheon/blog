import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    https: {
      key: './.cert/localhost-key.pem',
      cert: './.cert/localhost.pem'
    },
    proxy: {
      "/api": {
        target: "https://localhost:7130",
        secure: false,
        changeOrigin: true,
      }
    }
  }
})
