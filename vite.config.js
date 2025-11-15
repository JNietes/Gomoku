import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export function viteStaticCopyPyodide() {
  return viteStaticCopy({
    targets: [
      {
        src: 'node_modules/pyodide/**',   // copy full tree
        dest: 'assets/pyodide'            // end result: dist/assets/pyodide/...
      }
    ]
  })
}

export default defineConfig({
  optimizeDeps: { exclude: ['pyodide'] },
  plugins: [viteStaticCopyPyodide(), react()],
  base: '/Gomoku/'
})
