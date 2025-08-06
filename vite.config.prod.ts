import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// Production config without Spark dependencies for GitHub Actions
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src'),
      '@github/spark/hooks': resolve(projectRoot, 'src/lib/spark-shims.ts'),
      '@github/spark/spark': resolve(projectRoot, 'src/lib/spark-global.ts')
    }
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      },
      input: {
        main: resolve(projectRoot, 'index.html'),
        '404': resolve(projectRoot, '404.html')
      }
    }
  },
  define: {
    // Define NODE_ENV for production
    'process.env.NODE_ENV': '"production"'
  },
  publicDir: 'public'
});