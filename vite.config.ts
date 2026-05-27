import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  base: '/deconstruction/', // À adapter selon ton nom de repo GitHub Pages
})