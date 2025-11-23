import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, open: false })
  ],
  build: {
    // Raise warning limit slightly to reduce noisy warnings while
    // we apply code-splitting. Keep this conservative.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Conservative single-vendor chunk: place all node_modules into `vendor`.
        // This avoids subtle cross-chunk interop/load-order issues with React internals.
        manualChunks(id) {
          if (id && id.includes('node_modules')) return 'vendor';
          return undefined;
        }
      }
    }
  }
})
