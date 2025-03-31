import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),splitVendorChunkPlugin()],
  build:{
    emptyOutDir: true,
    outDir:'./../docs',
    cssMinify: true,
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  }
})
