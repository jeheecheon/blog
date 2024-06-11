import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/app")
    }
  },
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
